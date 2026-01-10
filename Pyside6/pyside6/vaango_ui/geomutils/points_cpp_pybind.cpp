#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>
#include <vector>
#include <cmath>

namespace py = pybind11;

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

py::array_t<bool> points_inside(py::array_t<double, py::array::c_style | py::array::forcecast> verts_in,
                                py::array_t<int, py::array::c_style | py::array::forcecast> faces_in,
                                py::array_t<double, py::array::c_style | py::array::forcecast> points_in) {
    auto verts_buf = verts_in.request();
    auto faces_buf = faces_in.request();
    auto pts_buf = points_in.request();

    if (verts_buf.ndim != 2 || verts_buf.shape[1] != 3)
        throw std::runtime_error("verts must be (N,3)");
    if (faces_buf.ndim != 2 || faces_buf.shape[1] != 3)
        throw std::runtime_error("faces must be (M,3)");
    if (pts_buf.ndim != 2 || pts_buf.shape[1] != 3)
        throw std::runtime_error("points must be (K,3)");

    const size_t n_faces = (size_t) faces_buf.shape[0];
    const size_t n_pts = (size_t) pts_buf.shape[0];

    const double *verts_ptr = static_cast<const double*>(verts_buf.ptr);
    const int *faces_ptr = static_cast<const int*>(faces_buf.ptr);
    const double *pts_ptr = static_cast<const double*>(pts_buf.ptr);

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

    // Build numpy boolean array to return
    py::array_t<bool> res(n_pts);
    auto res_buf = res.request();
    bool *res_ptr = static_cast<bool*>(res_buf.ptr);
    for (size_t i=0;i<n_pts;++i) res_ptr[i] = out[i];
    return res;
}

PYBIND11_MODULE(_points_cpp, m) {
    m.doc() = "point-in-mesh mask using C++/pybind11";
    m.def("points_inside", &points_inside, "points_inside(vertices, faces, points) -> bool mask");
}
