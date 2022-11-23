#ifndef __VAANGO_UI_SEARCH_UTILS_H__
#define __VAANGO_UI_SEARCH_UTILS_H__

#include <Core/Point.h>
#include <Utils/nanoflann.hpp>
#include <memory>

namespace VaangoUI {

/**
 * A point cloud for kd-tree searches for nearby points 
 */
struct ParticlePointCloud 
{
  std::vector<Point> d_pts;

  ParticlePointCloud() {}

  size_t addPoint(const Point& pt) {
    d_pts.emplace_back(pt);
    return d_pts.size()-1;
  }

  inline size_t size() const { return d_pts.size(); }

  inline size_t kdtree_get_point_count() const { return d_pts.size(); }

  inline double kdtree_get_pt(const size_t idx, const size_t dim) const
  {
    if (dim == 0) return d_pts[idx].x;
    else if (dim == 1) return d_pts[idx].y;
    else return d_pts[idx].z;
  }

  template <class BBOX>
  bool kdtree_get_bbox(BBOX& bb) const { return false; }

};

using ParticleKDTree2D  = nanoflann::KDTreeSingleIndexDynamicAdaptor<
                          nanoflann::L2_Simple_Adaptor<double, ParticlePointCloud>,
                          ParticlePointCloud, 2 /* dim */>;
using ParticleKDTree3D  = nanoflann::KDTreeSingleIndexDynamicAdaptor<
                          nanoflann::L2_Simple_Adaptor<double, ParticlePointCloud>,
                          ParticlePointCloud, 3 /* dim */>;
using ParticleKDTree2D_sp = std::shared_ptr<ParticleKDTree2D>;
using ParticleKDTree3D_sp = std::shared_ptr<ParticleKDTree3D>;

} // end namespace VaangoUI

#endif // __VAANGO_UI_SEARCH_UTILS_H__
