#ifndef __VAANGO_UI_SEARCH_UTILS_H__
#define __VAANGO_UI_SEARCH_UTILS_H__

#include <Core/Point.h>
#include <Utils/nanoflann.hpp>
#include <memory>

namespace VaangoUI {

/**
 * A point cloud for kd-tree seraches
 */
struct ParticlePointCloud 
{
  std::vector<Point> pts;

  ParticlePointCloud(const std::vector<Point>& centers)
  {
    pts = centers;
  }

  inline size_t kdtree_get_point_count() const { return pts.size(); }

  inline double kdtree_get_pt(const size_t idx, const size_t dim) const
  {
    if (dim == 0) return pts[idx].x;
    else if (dim == 1) return pts[idx].y;
    else return pts[idx].z;
  }

  template <class BBOX>
  bool kdtree_get_bbox(BBOX& bb) const { return false; }
};

using ParticleKDTree2D  = nanoflann::KDTreeSingleIndexAdaptor<
                          nanoflann::L2_Simple_Adaptor<double, ParticlePointCloud>,
                          ParticlePointCloud, 2 /* dim */>;
using ParticleKDTree3D  = nanoflann::KDTreeSingleIndexAdaptor<
                          nanoflann::L2_Simple_Adaptor<double, ParticlePointCloud>,
                          ParticlePointCloud, 3 /* dim */>;
using ParticleKDTree2D_sp = std::shared_ptr<ParticleKDTree2D>;
using ParticleKDTree3D_sp = std::shared_ptr<ParticleKDTree3D>;


} // end namespace VaangoUI

#endif // __VAANGO_UI_SEARCH_UTILS_H__
