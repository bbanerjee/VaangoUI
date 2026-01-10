#include <nanobind/nanobind.h>
#include <nanobind/ndarray.h>
#include <vector>
#include <cmath>

namespace nb = nanobind;

static inline bool ray_intersects_triangle(const double *orig, const double *dir,
                                           const double *v0, const double *v1, const double *v2,
                                           double EPS=1e-8) {
    double edge1[3], edge2[3];
    for (int i=0;i<3;++i) { edge1[i] = v1[i] - v0[i]; edge2[i] = v2[i] - v0[i]; }

    double h[3];
    h[0] = dir[1]*edge2[2] - dir[2]*edge2[1];
    h[1] = dir[2]*edge2[0] - dir[0]*edge2[2];
    h[2] = dir[0]*edge2[1] - dir[1]*edge2[0];

    double a = edge1[0]*h[0] + edge1[1]*h[1] + edge1[2]*h[2];
    if (std::abs(a) < EPS) return false;
    double f = 1.0 / a;

    double s[3];
    for (int i=0;i<3;++i) s[i] = orig[i] - v0[i];

    double u = f * (s[0]*h[0] + s[1]*h[1] + s[2]*h[2]);
    if (u < 0.0 || u > 1.0) return false;

    double q[3];
    q[0] = s[1]*edge1[2] - s[2]*edge1[1];
    q[1] = s[2]*edge1[0] - s[0]*edge1[2];
    q[2] = s[0]*edge1[1] - s[1]*edge1[0];

    double v = f * (dir[0]*q[0] + dir[1]*q[1] + dir[2]*q[2]);
    if (v < 0.0 || u + v > 1.0) return false;

    double t = f * (edge2[0]*q[0] + edge2[1]*q[1] + edge2[2]*q[2]);
    return t > EPS;
}

nb::list points_inside(nb::ndarray<double, nb::shape<nb::any,3>> verts,
                       nb::ndarray<int, nb::shape<nb::any,3>> faces,
                       nb::ndarray<double, nb::shape<nb::any,3>> points) {
    const size_t n_verts = (size_t) verts.shape(0);
    const size_t n_faces = (size_t) faces.shape(0);
    const size_t n_pts = (size_t) points.shape(0);

    // nanobind ndarray provides .data() and .shape() accessors
    const double *verts_ptr = verts.data();
    const int *faces_ptr = faces.data();
    const double *pts_ptr = points.data();

    std::vector<bool> out(n_pts,false);
    double dir[3] = {1.0, 0.0, 0.0};

    for (size_t pi = 0; pi < n_pts; ++pi) {
        const double *p = pts_ptr + pi*3;
        int intersections = 0;
        for (size_t fi = 0; fi < n_faces; ++fi) {
            int i0 = faces_ptr[fi*3 + 0];
            int i1 = faces_ptr[fi*3 + 1];
            int i2 = faces_ptr[fi*3 + 2];
            const double *v0 = verts_ptr + (size_t)i0*3;
            const double *v1 = verts_ptr + (size_t)i1*3;
            const double *v2 = verts_ptr + (size_t)i2*3;
            if (ray_intersects_triangle(p, dir, v0, v1, v2)) ++intersections;
        }
        out[pi] = (intersections % 2) == 1;
    }

    nb::list res;
    for (size_t i=0;i<n_pts;++i) res.append(out[i]);
    return res;
}

NB_MODULE(_points_cpp, m) {
    m.def("points_inside", &points_inside, "points_inside(vertices, faces, points) -> bool mask");
}
