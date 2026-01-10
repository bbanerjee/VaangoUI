import numpy as np


# Optional compiled extension (pybind11 or nanobind). If built, it's placed
# at vaango_ui.geomutils._points_cpp and speeds up point-in-mesh tests.
try:
    from . import _points_cpp  # type: ignore
    _HAS_CPP = True
except Exception:
    _HAS_CPP = False


class PointGeneratorRandom:
    """Generate random points inside a triangulated surface.

    Optimizations:
    - Vectorized Möller–Trumbore per-triangle precomputation.
    - Batched candidate sampling to reduce Python loop overhead.
    """

    EPS = 1e-8

    @staticmethod
    def _precompute_triangle_data(vertices: np.ndarray, faces: np.ndarray, ray_dir: np.ndarray = None):
        if ray_dir is None:
            ray_dir = np.array([1.0, 0.0, 0.0])

        v0 = vertices[faces[:, 0]]
        v1 = vertices[faces[:, 1]]
        v2 = vertices[faces[:, 2]]

        edge1 = v1 - v0
        edge2 = v2 - v0

        h = np.cross(ray_dir, edge2)
        a = np.einsum("ij,ij->i", edge1, h)
        with np.errstate(divide='ignore', invalid='ignore'):
            f = np.where(np.abs(a) > PointGeneratorRandom.EPS, 1.0 / a, 0.0)

        return {
            "v0": v0,
            "edge1": edge1,
            "edge2": edge2,
            "h": h,
            "a": a,
            "f": f,
            "ray_dir": ray_dir,
        }

    @staticmethod
    def _point_intersections_count(point: np.ndarray, tri_data) -> int:
        # This helper remains for the numpy fall-back; if the C++ extension is
        # available, the faster path below will be used instead.
        v0 = tri_data["v0"]
        edge1 = tri_data["edge1"]
        edge2 = tri_data["edge2"]
        h = tri_data["h"]
        f = tri_data["f"]
        ray_dir = tri_data["ray_dir"]

        s = point - v0  # (M,3)
        u = f * np.einsum("ij,ij->i", s, h)

        # Valid u mask
        mask_u = (u >= 0.0) & (u <= 1.0)
        if not np.any(mask_u):
            return 0

        q = np.cross(s, edge1)
        v = f * np.dot(q, ray_dir)

        mask_v = (v >= 0.0) & (u + v <= 1.0)

        mask = mask_u & mask_v & (np.abs(tri_data["a"]) > PointGeneratorRandom.EPS)
        if not np.any(mask):
            return 0

        t = f * np.einsum("ij,ij->i", edge2, q)
        mask_t = t > PointGeneratorRandom.EPS

        intersections = np.count_nonzero(mask & mask_t)
        return int(intersections)

    @staticmethod
    def _points_inside_mesh(points: np.ndarray, tri_data) -> np.ndarray:
        """Return boolean mask of which points are inside the mesh.

        Uses vectorized, per-point counting of intersections but avoids Python loops
        over triangles by using triangle precomputation and numpy operations.
        """
        if _HAS_CPP:
            # use the compiled C++ extension for the heavy work
            # _points_cpp.points_inside returns a boolean numpy array
            try:
                return _points_cpp.points_inside(vertices=tri_data.get('v_all'),
                                                 faces=tri_data.get('faces_idx'),
                                                 points=points)
            except Exception:
                # fall back to numpy implementation if the extension call fails
                pass

        inside = np.zeros(len(points), dtype=bool)
        for i, p in enumerate(points):
            cnt = PointGeneratorRandom._point_intersections_count(p, tri_data)
            inside[i] = (cnt % 2) == 1
        return inside

    @staticmethod
    def generate_interior_points(vertices: np.ndarray, faces: np.ndarray, num_points: int, *, batch_size: int = None) -> np.ndarray:
        """Generate points inside the mesh using batched rejection sampling.

        - `batch_size` controls how many random candidates are tested per iteration.
          If omitted it's chosen automatically for reasonable throughput.
        """
        if len(vertices) == 0 or num_points <= 0:
            return np.empty((0, 3))

        # Get bounding box
        min_bounds = np.min(vertices, axis=0)
        max_bounds = np.max(vertices, axis=0)

        # Precompute triangle data used by the intersection test
        tri_data = PointGeneratorRandom._precompute_triangle_data(vertices, faces)
        # store raw arrays in tri_data so C++ extension can consume them directly
        tri_data['v_all'] = vertices
        tri_data['faces_idx'] = faces.astype(np.int32)

        if batch_size is None:
            batch_size = max(1024, min(65536, num_points * 8))

        interior = []
        attempts = 0
        max_attempts = max(10000, num_points * 200)

        while len(interior) < num_points and attempts < max_attempts:
            n = min(batch_size, num_points - len(interior))
            # generate a bit more candidates than needed to improve chance of filling
            gen_n = max(n, batch_size)
            candidates = np.random.uniform(min_bounds, max_bounds, size=(gen_n, 3))

            mask = PointGeneratorRandom._points_inside_mesh(candidates, tri_data)
            if np.any(mask):
                inside_pts = candidates[mask]
                need = num_points - len(interior)
                take = inside_pts[:need]
                interior.append(take)

            attempts += gen_n

        if len(interior) == 0:
            return np.empty((0, 3))

        interior = np.vstack(interior)
        return interior[:num_points]

