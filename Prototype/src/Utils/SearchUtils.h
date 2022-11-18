#ifndef __VAANGO_UI_SEARCH_UTILS_H__
#define __VAANGO_UI_SEARCH_UTILS_H__

#include <Core/Point.h>
#include <Utils/nanoflann.hpp>
#include <memory>

namespace nanoflann {

/** **Squared** Euclidean (L2) circl-to-circle distance functor 
 * (suitable for low-dimensionality
 * datasets, like 2D or 3D point clouds) Corresponding distance traits:
 * nanoflann::metric_L2_Simple
 *
 * \tparam T Type of the elements (e.g. double, float, uint8_t)
 * \tparam DataSource Source of the data, i.e. where the vectors are stored
 * \tparam _DistanceType Type of distance variables (must be signed)
 * \tparam AccessorType Type of the arguments with which the data can be
 * accessed (e.g. float, double, int64_t, T*)
 * 
 * Assumes last value in the point vector is the radius
 */
template <
    class T, class DataSource, typename _DistanceType = T,
    typename AccessorType = uint32_t>
struct L2_Circle_Adaptor
{
    using ElementType  = T;
    using DistanceType = _DistanceType;

    const DataSource& data_source;

    L2_Circle_Adaptor(const DataSource& _data_source)
        : data_source(_data_source)
    {
    }

    DistanceType evalMetric(
        const T* a, const AccessorType b_idx, size_t size) const
    {
        DistanceType result = DistanceType();
        for (size_t i = 0; i < size-1; ++i)
        {
            const DistanceType diff =
                a[i] - data_source.kdtree_get_pt(b_idx, i);
            result += diff * diff;
        }
        result -= (a[size-1] + data_source.kdtree_get_pt(b_idx, size-1));

        return result;
    }

    template <typename U, typename V>
    DistanceType accum_dist(const U a, const V b, const size_t) const
    {
        return (a - b) * (a - b);
    }
};

/** Metaprogramming helper traits class for the L2_Circle (Euclidean)
 * **squared** distance metric */
struct metric_L2_Circle : public Metric
{
    template <class T, class DataSource, typename AccessorType = uint32_t>
    struct traits
    {
        using distance_t = L2_Circle_Adaptor<T, DataSource, T, AccessorType>;
    };
};
} // end namespace nanoflann

namespace VaangoUI {

/**
 * A point cloud for kd-tree seraches
 */
struct ParticlePointCloud 
{
  std::vector<Point> d_pts;
  std::vector<double> d_radii;

  ParticlePointCloud(const std::vector<Point>& centers,
                     const std::vector<double>& radii)
  {
    d_pts = centers;
    d_radii = radii;
  }

  inline size_t kdtree_get_point_count() const { return d_pts.size(); }

  inline double kdtree_get_pt(const size_t idx, const size_t dim) const
  {
    if (dim == 0) return d_pts[idx].x;
    else if (dim == 1) return d_pts[idx].y;
    else if (dim == 2) return d_pts[idx].z;
    else return d_radii[idx];
  }

  template <class BBOX>
  bool kdtree_get_bbox(BBOX& bb) const { return false; }

  size_t addPoint(const Point& center, double radius) {
    d_pts.push_back(center);
    d_radii.push_back(radius);
    return d_pts.size()-1;
  }

  size_t size() const {
    return d_pts.size();
  }
};

using ParticleKDTree2D  = nanoflann::KDTreeSingleIndexDynamicAdaptor<
                          nanoflann::L2_Circle_Adaptor<double, ParticlePointCloud>,
                          ParticlePointCloud, 2 /* dim */>;
using ParticleKDTree3D  = nanoflann::KDTreeSingleIndexDynamicAdaptor<
                          nanoflann::L2_Circle_Adaptor<double, ParticlePointCloud>,
                          ParticlePointCloud, 3 /* dim */>;
using ParticleKDTree2D_sp = std::shared_ptr<ParticleKDTree2D>;
using ParticleKDTree3D_sp = std::shared_ptr<ParticleKDTree3D>;


} // end namespace VaangoUI

#endif // __VAANGO_UI_SEARCH_UTILS_H__
