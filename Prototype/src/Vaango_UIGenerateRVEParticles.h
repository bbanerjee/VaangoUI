#ifndef __Vaango_UI_GENERATE_RVE_PARTICLES_H__
#define __Vaango_UI_GENERATE_RVE_PARTICLES_H__

#include <Utils/SearchUtils.h>

#include <cmath>
#include <map>
#include <random>
#include <string>

namespace VaangoUI {

class Vaango_UIGenerateRVEParticles
{
private:

  std::mt19937_64 d_gen;
  std::uniform_real_distribution<double> d_dist;

  std::vector<double> d_radii;

public:
  Vaango_UIGenerateRVEParticles();
  ~Vaango_UIGenerateRVEParticles() = default;

  //--------------------------------------------------------------------------
  // Method for distributing particles
  //--------------------------------------------------------------------------
  void distributeParticles(double rveSize, 
                           bool periodic,
                           const ParticleShape& shape,
                           double thickness) ;

  //--------------------------------------------------------------------------
  // Create a periodic distribution of particles in the box.  Similar
  // approach to random sequential packing of distributeCircles
  //--------------------------------------------------------------------------
  void distributeCirclesPeriodic(double rveSize, double thickness, 
                                 bool periodic = false);

  // Find if the center is inside the RVE
  bool inLimits(double x, double min, double max);

  // Return the number of new circle locations for period distributions
  int findPartLoc(double rveSize,
                  double rad, const Point& pt, double min, double max, 
                  std::vector<Point>& loc);

  //--------------------------------------------------------------------------
  // Distribute spheres in a periodic unit cell (distribute the spherical particles in a cube 
  // box with the given dimensions)
  //--------------------------------------------------------------------------
  void distributeSpheresPeriodic(double rveSize, double thickness,
                                 bool periodic = true);

  // Find whether the current circle or sphere intersects another circle or sphere
  // from the existing particle list
  bool intersectsAnother(Point center, double diameter, 
                         ParticleKDTree3D& kdtree, 
                         double searchRadius) const;

  //--------------------------------------------------------------------------
  // Estimate the number of particles of each size in the RVE
  //--------------------------------------------------------------------------
  void estimateRVEPartSizeDist(double rveSize, const ParticleShape& shape);

  // Return the number of new locations to be tested for periodic distributions of 
  // spheres in a cubic box
  void findPeriodicSpherePartLoc(const Point& center, double diameter, 
                                 const Point& rveMin, const Point& rveMax,
                                 std::vector<Point>& periodicLoc) const;

  bool boxBoxIntersect(const Point& ptMin, const Point& ptMax, 
                       const Point& rveMin, const Point& rveMax) const;
};

} // namespace VaangoUI

#endif //__Vaango_UI_GENERATE_RVE_PARTICLES_H__
