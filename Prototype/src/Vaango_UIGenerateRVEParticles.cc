#include <Vaango_UIGenerateRVEParticles.h>

#include <Vaango_UIData.h>

#include <Core/Enums.h>
#include <Core/ParticleSizeDist.h>
#include <Core/ParticlesInRVE.h>

#include <iostream>
#include <cmath>
//#include <chrono>
//#include <thread>

namespace VaangoUI {

Vaango_UIGenerateRVEParticles::Vaango_UIGenerateRVEParticles()
{
  std::random_device rd;
  d_gen.seed(rd());
  d_dist.param(std::uniform_real_distribution<double>::param_type(0, 1));
}

//--------------------------------------------------------------------------
// Method for distributing particles
//--------------------------------------------------------------------------
void 
Vaango_UIGenerateRVEParticles::distributeParticles(double rveSize, 
                          bool periodic,
                          const ParticleShape& partShape,
                          double thickness) 
{
  // Clean the particle diameter vectors etc. and start afresh
  s_partList.clear();

  d_radii.clear();

  // Estimate the number of particles of each size in the RVE
  estimateRVEPartSizeDist(rveSize, partShape);

  // Distribute the particles in the boxes based on the type of 
  // particles
  switch (partShape) {
  case ParticleShape::CIRCLE:
    distributeCirclesPeriodic(rveSize, -1.0, periodic);
    break;
  case ParticleShape::HOLLOW_CIRCLE:
    distributeCirclesPeriodic(rveSize, thickness, periodic);
    break;
  case ParticleShape::SPHERE:
    distributeSpheresPeriodic(rveSize, -1.0, periodic);
    break;
  case ParticleShape::HOLLOW_SPHERE:
    distributeSpheresPeriodic(rveSize, thickness, periodic);
    break;
  default:
    break;
  }
}

//--------------------------------------------------------------------------
// Create a periodic distribution of particles in the box.  Similar
// approach to random sequential packing of distributeCircles
//--------------------------------------------------------------------------
void 
Vaango_UIGenerateRVEParticles::distributeCirclesPeriodic(double rveSize, 
                                                         double thickness, 
                                                         bool periodic) {

  constexpr int MAX_ITER = 100;

  // Set material code to zero
  int matCode = 0;

  // Create a kd tree for storing and searching the center locations
  // Construct kd-tree index
  ParticlePointCloud cloud;
  ParticleKDTree3D kdtree(3, cloud, {10});

  // Get the number of particle sizes
  int nofSizesCalc = s_sizeDist.numSizesCalc;

  // Compute the rve volume
  double rveVolume = rveSize*rveSize;
  
  // Make a copy of the target number of particles of each size
  std::vector<int> targetNofParts = s_sizeDist.freq2DCalc;

  // The sizes are distributed with the smallest first.  Pick up
  // the largest size and iterate down through smaller sizes
  double searchRadius = 2.5*s_sizeDist.sizeCalc[nofSizesCalc-1];
  double totalVolume = 0.0;
  double volFrac = totalVolume/rveVolume;
  double targetPartVolFrac = 0.0;
  for (int ii = nofSizesCalc; ii > 0; ii--) {

    // Get the number of particles for the current size
    int nofParts = s_sizeDist.freq2DCalc[ii-1];
    //std::cout << "Particle Size = " <<  s_sizeDist.sizeCalc[ii-1]
    //          << " Required particles = " << nofParts 
    //          << " (" << s_sizeDist.freq2DCalc[ii-1] << ") "
    //          << " Target = " << targetNofParts[ii-1] << "\n";

    // Get the particle size
    double partRad = 0.5*s_sizeDist.sizeCalc[ii-1];
    double partRadNext = (ii == 0) ? 0.5*s_sizeDist.sizeCalc.back() : 0.5*s_sizeDist.sizeCalc[ii-1]; 
    double partVol = M_PI*partRad*partRad;
    targetPartVolFrac += (double) targetNofParts[ii-1]*partVol/rveVolume;

    // Calculate the limits of the box outside which periodic bcs
    // come into play
    double boxInMin = partRad;
    double boxInMax = rveSize-partRad;
    double boxMin = boxInMin;
    double boxMax = boxInMax;
    if (periodic) {
      boxMin = -0.5*partRad;
      boxMax = rveSize+0.5*partRad;
    }

    //std::cout << "periodic: " << std::boolalpha << periodic
    //          << " box_xy: " << boxMin << ", " << boxMax
    //          << " box_in: " << boxInMin << ", " << boxInMax << "\n";

    // Pick up each particle and insert it into the box
    //std::cout << "No. of particles to be inserted = "+nofParts);
    int numFitted = 0;
    for (int jj = 0; jj < nofParts; jj++) {

      bool fit = false;
      int nofIter = 0;
      //while (!fit && nofIter < MAX_ITER && numFitted < nofParts) {
      while (!fit && nofIter < MAX_ITER) {

        // Generate a random location for the particle
        // (from boxmin-0.5*partDia to boxmax+0.5*partdia)
        double tx = d_dist(d_gen);
        double ty = d_dist(d_gen);
        double xCent = (1-tx)*boxMin + tx*boxMax;
        double yCent = (1-ty)*boxMin + ty*boxMax;
        Point partCent(xCent, yCent, 0.0);

        // If the particle is partially outside the original box
        // then deal with it separately, otherwise do the standard checks
        if (inLimits(xCent, boxInMin, boxInMax) &&
            inLimits(yCent, boxInMin, boxInMax) ) {

          // Particle is inside the box .. find if it intersects another
          // particle previously placed in box.  If it does then 
          // try again otherwise add the particle to the list.
          if (!intersectsAnother(partCent, partRad,
                                       kdtree, searchRadius)) {

            // Add a particle to the particle list
            ParticleInRVE newParticle(partRad, rveSize, 
                                      thickness, partCent, matCode);
            s_partList.addParticle(newParticle);

            //newParticle.print();
            totalVolume += newParticle.getVolume();

            // Add the particle to the kd tree
            size_t start = cloud.size();
            size_t end = cloud.addPoint(newParticle.getCenter());
            kdtree.addPoints(start, end);

            // Add to vectors
            d_radii.emplace_back(partRad);

            fit = true;
            numFitted++;

            //std::cout << "Added particle: " << numFitted 
            //          << " of radius: " << partRad << "\n";

          }
          nofIter++;

        } else {

          if (!periodic) {
            break;
          }

          // Check if this particle intersects another
          if (!intersectsAnother(partCent, partRad,
                                       kdtree, searchRadius)) {

            bool intersects = false;

            // Particle is partially outside the box  ... create periodic 
            // images and check each one (there are eight possible locations 
            // of the center)
            std::vector<Point> loc;
            int nofLoc = findPartLoc(rveSize, partRad, partCent, 0, rveSize,
                                    loc);
            for (auto pt : loc) {
              if (intersectsAnother(pt, partRad,
                                          kdtree, searchRadius)) {
                intersects = true;
                break;
              }                           
            }

            if (!intersects) {

              // Add the original particle to the particle list
              size_t start = cloud.size();
              size_t end;
              {
                ParticleInRVE newParticle(partRad, rveSize, 
                                          thickness, partCent, matCode);
                s_partList.addParticle(newParticle);

                //newParticle.print();
                totalVolume += newParticle.getVolume();

                // Add the particle to the point cloud
                end = cloud.addPoint(newParticle.getCenter());

                // Add to vectors
                d_radii.emplace_back(partRad);

                ++numFitted;
                //std::cout << "Periodic particle added\n";
              }

              // Add the periodic particles
              for (auto pt: loc) {

                ParticleInRVE newParticle(partRad, rveSize, 
                                          thickness, pt, matCode);
                s_partList.addParticle(newParticle);

                //newParticle.print();

                // The periodic parts do not add eto th eparticle volume fraction
                //totalVolume += newParticle.getVolume();

                // Add the particle to the point cloud
                end = cloud.addPoint(newParticle.getCenter());

                // Add to vectors
                d_radii.emplace_back(partRad);
              }

              // Add the particle and its images to the kd tree
              kdtree.addPoints(start, end);
            }
          }
          ++nofIter;
        }
        if (nofIter%MAX_ITER == 0) {

          double partRadPrev = partRad;
          if (partRad > partRadNext) {
            partRad = 0.5*(partRadPrev + partRadNext);
            std::cout << "No. of Iterations = " <<  nofIter  
                      << " Particle Radius (old) = " <<  partRadPrev 
                      << " Particle Radius (new) = " <<  partRad 
                      << " Particle Radius (next) = " <<  partRadNext << "\n";
            nofIter = 0;
          } 
        }
      }
    } // end for jj < nofParts

    volFrac = totalVolume/rveVolume;
    targetPartVolFrac = std::min(targetPartVolFrac, 
                                 s_sizeDist.particleVolFrac/100.0);
    std::cout << " Size = " << ii << " Particles fitted = " << numFitted 
              << " Vol. Frac. = " << volFrac
              << " Target vf = " << targetPartVolFrac 
              << " partRad = " << partRad << "\n";
    if (numFitted > 0) {
      double volFracDiff = volFrac - targetPartVolFrac; 
      if (volFracDiff < -0.05*targetPartVolFrac) {
        double volDiff = std::abs(volFracDiff*rveVolume);
        if (ii == 1) {
          partRad = 0.5*s_sizeDist.sizeCalc[ii-1];
          partVol = M_PI*partRad*partRad;
          int numExtraParts = (int) std::ceil(volDiff/partVol);
          s_sizeDist.freq2DCalc[ii-1] = numExtraParts;
          ii = 2;
        } else {
          partRad = 0.5*s_sizeDist.sizeCalc[ii-2];
          partVol = M_PI*partRad*partRad;
          int numExtraParts = (int) std::ceil(volDiff/partVol);
          s_sizeDist.freq2DCalc[ii-2] += numExtraParts;
        }
      }
    }
  } // end for ii < nofSizes

  std::cout << "RVE volume = " << rveVolume
            << " Total particle volume = " << totalVolume
            << " Volume fraction = " << totalVolume/rveVolume << "\n";
}

bool 
Vaango_UIGenerateRVEParticles::inLimits(double x, double min, double max) {
  if (x == min || x == max || (x > min && x < max)) return true;
  return false;
}

// Find whether the current circle intersects another circle from the existing 
// particle list
bool 
Vaango_UIGenerateRVEParticles::intersectsAnother(Point center, double radius, 
                                                 ParticleKDTree3D& kdtree,
                                                 double searchRadius) const {

  // Create an array in the form needed by the kd-tree
  double queryPoint[3] = {center.x, center.y, center.z};

  // Find the neighbors within the search radius of the
  // point.  The search radius = 2*diameter of the particle.
  const double searchRadiusSq = searchRadius*searchRadius;
  std::vector<std::pair<size_t, double>> indices_dists;
  nanoflann::RadiusResultSet<double, size_t> resultSet(searchRadiusSq, indices_dists);
  kdtree.findNeighbors(resultSet, queryPoint);

  // Loop through the nearest neighbors
  for (auto data : resultSet.m_indices_dists) {

    // Get the stored index from the kd tree
    size_t index = data.first;

    // Get the dist 
    double dist = std::sqrt(data.second);

    // Get the neighbor particle radius using the kd tree index
    double neighborRadius = d_radii[index];
    double radSum = (radius + neighborRadius);
    if (!(dist > radSum)) {
      //std::cout << "index = " << index << " dist = " << dist 
      //          << " radSum = " << radSum << "\n";
      return true;
    }
  }

  return false;
}

// Return the number of new circle locations for period distributions
int 
Vaango_UIGenerateRVEParticles::findPartLoc(double rveSize,
                double rad, const Point& pt, double min, double max, 
                std::vector<Point>& loc) {

  // Create a box around the particle
  double xmin = pt.x - rad;
  double xmax = pt.x + rad;
  double ymin = pt.y - rad;
  double ymax = pt.y + rad;

  // Check the 8 regions to see if the particles intersect any of these
  // regions .. first the corners and then the sides
  if (xmin < min && ymin < min) {
    // Create three more particles at the other three corners
    // This is the lower left hand corner
    // New Particle 1 : lower right hand
    loc.push_back(Point(pt.x + rveSize, pt.y, 0.0));
    // New Particle 2 : upper right hand
    loc.push_back(Point(pt.x + rveSize, pt.y + rveSize, 0.0));
    // New Particle 3 : upper left hand
    loc.push_back(Point(pt.x, pt.y + rveSize, 0.0));
    return 3;
  }
  if (xmax > max && ymin < min) {
    // Create three more particles at the other three corners
    // This is the lower right hand corner
    // New Particle 1 : lower left hand
    loc.push_back(Point(pt.x - rveSize, pt.y, 0.0));
    // New Particle 2 : upper right hand
    loc.push_back(Point(pt.x, pt.y + rveSize, 0.0));
    // New Particle 3 : upper left hand
    loc.push_back(Point(pt.x - rveSize, pt.y + rveSize, 0.0));
    return 3;
  }
  if (xmax > max && ymax > max) {
    // Create three more particles at the other three corners
    // This is the upper right hand corner
    // New Particle 1 : lower left hand
    loc.push_back(Point(pt.x - rveSize, pt.y - rveSize, 0.0));
    // New Particle 2 : lower right hand
    loc.push_back(Point(pt.x, pt.y - rveSize, 0.0));
    // New Particle 3 : upper left hand
    loc.push_back(Point(pt.x - rveSize, pt.y, 0.0));
    return 3;
  }
  if (xmin < min && ymax > max) {
    // Create three more particles at the other three corners
    // This is the upper left hand corner
    // New Particle 1 : lower left hand
    loc.push_back(Point(pt.x, pt.y - rveSize, 0.0));
    // New Particle 2 : lower right hand
    loc.push_back(Point(pt.x + rveSize, pt.y - rveSize, 0.0));
    // New Particle 3 : upper right hand
    loc.push_back(Point(pt.x + rveSize, pt.y, 0.0));
    return 3;
  }
  if (xmin < min) {
    // Create one more particles at right side
    // This is the left side
    // New Particle 1 : right side
    loc.push_back(Point(pt.x + rveSize, pt.y, 0.0));
    return 1;
  }
  if (xmax > max) {
    // Create one more particles at left side
    // This is the right side
    // New Particle 1 : left side
    loc.push_back(Point(pt.x - rveSize, pt.y, 0.0));
    return 1;
  }
  if (ymin < min) {
    // Create one more particles at upper side
    // This is the lower side
    // New Particle 1 : upper side
    loc.push_back(Point(pt.x, pt.y + rveSize, 0.0));
    return 1;
  }
  if (ymax > max) {
    // Create one more particles at bottom side
    // This is the top side
    // New Particle 1 : bottom side
    loc.push_back(Point(pt.x, pt.y - rveSize, 0.0));
    return 1;
  }
  return 0;
}

//--------------------------------------------------------------------------
// Distribute spheres in a periodic unit cell (distribute the spherical particles in a cube 
// box with the given dimensions)
//--------------------------------------------------------------------------
void 
Vaango_UIGenerateRVEParticles::distributeSpheresPeriodic(double rveSize, 
                                                         double thickness,
                                                         bool periodic) {

  // Set up some values that don't change
  constexpr int MAX_ITER = 3000;

  // No rotation needed; material code is 0
  double rotation = 0.0;
  int matCode = 0;

  // Set up the limits of the RVE box
  Point rveMin(0.0, 0.0, 0.0);
  Point rveMax(rveSize, rveSize, rveSize);

  // Create a kd tree for storing and searching the center locations
  // Construct kd-tree index
  ParticlePointCloud cloud;
  ParticleKDTree3D kdtree(3, cloud, {10});

  // Set up maximum search distance (this is equal to the largest particle
  // diameter)
  int nofSizesCalc = s_sizeDist.numSizesCalc;
  double searchRadius = 2.5*s_sizeDist.sizeCalc[nofSizesCalc-1];

  // Initialize the volume of the particles
  double vol = 0.0;

  // Pick up each particle and place in the cube ..  the largest 
  // particles first
  for (int ii = nofSizesCalc; ii > 0; ii--) {
    int nofParts = s_sizeDist.freq3DCalc[ii-1];
    double partDia = s_sizeDist.sizeCalc[ii-1];
    double partRad = 0.5*partDia;

    for (int jj = 0; jj < nofParts; jj++) {

      // Set up the particle diameter
      //std::cout << "Particle size fraction # = " << ii
      //          << " Particle # = " << jj << "\n";

      // Increase the size of the box so that periodic distributions
      // are allowed
      double boxMin = partRad;
      double boxMax = rveSize - partRad;
      if (periodic) {
        boxMin = -0.45*partDia;
        boxMax = rveSize+0.45*partDia;
      }

      // Iterate till the particle fits in the box
      bool fit = false;

      int nofIter = 0;
      while (!fit && nofIter < MAX_ITER) {

        // Increment the iterations and quit if the MAX_ITER is exceeded
        nofIter++;

        // Generate a random location for the particle
        // (from boxmin-0.5*partDia to boxmax+0.5*partdia)
        double tx = d_dist(d_gen);
        double ty = d_dist(d_gen);
        double tz = d_dist(d_gen);
        double xCent = (1-tx)*boxMin + tx*boxMax;
        double yCent = (1-ty)*boxMin + ty*boxMax;
        double zCent = (1-tz)*boxMin + tz*boxMax;
        Point partCent(xCent, yCent, zCent);

        /*
        if (!(inLimits(xCent, boxMin, boxMax) &&
             inLimits(yCent, boxMin, boxMax) &&
             inLimits(yCent, boxMin, boxMax))) {
          std::cout << "particle outside rve\n";
          continue;
        }
        */

        size_t start = 0, end = 0;

        // If the size of the tree is zero, just put the particles in without
        // checking intersections
        if (cloud.size() == 0) {

          {
            // Add the particle to the particle list
            ParticleInRVE newParticle(ParticleShape::SPHERE, partRad,
                                      rotation, partCent, matCode, thickness);
            s_partList.addParticle(newParticle);
            //newParticle.print();

            // Add to point cloud
            start = cloud.size();
            end = cloud.addPoint(newParticle.getCenter());

            // Add to radius vector
            d_radii.emplace_back(partRad);
          }

          // The sphere does not necessarily fit completely in the box.  
          // Place it in a periodic manner.
          // Find the possible images of the sphere in a periodic unit cell
          if (periodic) {
            std::vector<Point> periodicLoc;
            findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);

            for (auto& pt: periodicLoc) {

              // Add the particle to the particle list
              ParticleInRVE newParticle(ParticleShape::SPHERE, partRad,
                                        rotation, pt, matCode, thickness);
              s_partList.addParticle(newParticle);
              //newParticle.print();

              // Add to point cloud
              end = cloud.addPoint(newParticle.getCenter());

              // Add to radius vector
              d_radii.emplace_back(partRad);
            }
          }

          // Add the particles to the kd tree
          kdtree.addPoints(start, end);

          // Update volume and set the fit flag to true
          // Each set of images of a particle only contributes one volume
          vol += partDia*partDia*partDia*M_PI/6.0;
          fit = true;

          //std::cout << "Added sphere : rad = " << radius << " vol = " << vol << "\n";

        } else { // If the kd tree contains points

          bool noIntersections = true;

          // Find whether the current sphere intersects any other spheres in the list
          // Uses the kd tree.
          //std::cout << "cloud size = " << cloud.size() << "\n";
          if (intersectsAnother(partCent, partRad, 
                                      kdtree, searchRadius)) {
            noIntersections = false;
          }

          //std::cout << "1-no intersects ? " << std::boolalpha << noIntersections << "\n";
          std::vector<Point> periodicLoc;
          if (periodic) {
            if (noIntersections) {

              // The sphere does not necessarily fit completely in the box.  
              // Place it in a periodic manner.
              // Find the possible images of the sphere in a periodic unit cell
              findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
              for (auto& pt: periodicLoc) {

                // Find whether the current sphere intersects any other spheres in the list
                // Uses the kd tree.
                if (intersectsAnother(pt, partRad, 
                                            kdtree, searchRadius)) {
                  noIntersections = false;
                  break;
                }
              } // end loop through images
            }
          }

          // If there are no intersections then add these points
          //std::cout << "2-no intersects ? " << std::boolalpha << noIntersections << "\n";
          if (noIntersections) {

            {
              // Add the particle to the particle list
              ParticleInRVE newParticle(ParticleShape::SPHERE, partRad,
                                        rotation, partCent, matCode, thickness);
              s_partList.addParticle(newParticle);
              //std::cout << "2-main: " << newParticle << "\n";

              // Add to point cloud
              start = cloud.size();
              end = cloud.addPoint(newParticle.getCenter());

              // Add to radius vector
              d_radii.emplace_back(partRad);
            }

            end = start;

            if (periodic) {
              for (auto& pt: periodicLoc) {

                // Add the particle to the particle list
                ParticleInRVE newParticle(ParticleShape::SPHERE, partRad,
                                          rotation, pt, matCode, thickness);
                s_partList.addParticle(newParticle);
                //std::cout << "2-periodic: " << newParticle << "\n";

                // Add to point cloud
                end = cloud.addPoint(newParticle.getCenter());

                // Add to radius vector
                d_radii.emplace_back(partRad);
              } // End of loop through images
            }

            // Add the particles to the kd tree
            //std::cout << "Adding pts to kd-tree" << start << ":" << end << std::endl;
            kdtree.addPoints(start, end);

            // Update volume and set the fit flag to true
            // Each set of images of a particle only contributes one volume
            vol += partDia*partDia*partDia*M_PI/6.0;
            //std::cout << "vol-2 = " << vol << "\n";
            fit = true;

          } // end of intersection check
        } // end of kd-tree if 
        //std::cout << nofIter << " ";
      } // end while not fit
      //std::cout << "\n";
      //std::cout << "ii = " << ii << " jj = " << jj << " rad = " << partRad << "\n";
    } // end no of parts loop
  } // end no of part sizes loop

  // calculate the volume of the particles
  double volBox = std::pow(rveSize,3);
  double vfrac = vol/volBox;

  // Fill up the rest with fines 
  double partDia = s_sizeDist.sizeCalc[0];
  double fracComp = s_sizeDist.particleVolFrac/100.0;
  double partRad = 0.5*partDia;

  std::cout << "After Stage 1: No of parts = " << s_partList.size()
            << " Vol frac = " << vfrac << " MaxFrac" << fracComp << "\n";
  std::cout << " Volume of parts = " << vol << " Box vol = " << volBox << "\n";

  while (vfrac < fracComp) {

    bool fit = false;
    int nofIter = 0;
    //std::cout << "Part radius = " << partRad << " Vol frac = " << vfrac
    //          << " Target Vol Frac = " << s_sizeDist.particleVolFrac << "\n";

    // Increase the size of the box so that periodic distributions
    // are allowed
    double boxMin = partRad;
    double boxMax = rveSize - partRad;
    if (periodic) {
      boxMin = -0.45*partDia;
      boxMax = rveSize+0.45*partDia;
    }

    while (!fit) {

      // Increment the iterations and quit if the MAX_ITER is exceeded
      if (nofIter > MAX_ITER) break;
      nofIter++;

      // Generate a random location for the particle
      // (from boxmin-0.5*partDia to boxmax+0.5*partdia)
      double tx = d_dist(d_gen);
      double ty = d_dist(d_gen);
      double tz = d_dist(d_gen);
      double xCent = (1-tx)*boxMin + tx*boxMax;
      double yCent = (1-ty)*boxMin + ty*boxMax;
      double zCent = (1-tz)*boxMin + tz*boxMax;
      Point partCent(xCent, yCent, zCent);

      // Find whether the current sphere intersects any other spheres in the list
      // Uses the kd tree.
      bool noIntersections = true;
      if (intersectsAnother(partCent, partRad, 
                                  kdtree, searchRadius)) {
        noIntersections = false;
      }

      std::vector<Point> periodicLoc;
      if (periodic) {
        if (noIntersections) {

          // The sphere does not necessarily fit completely in the box.  
          // Place it in a periodic manner.
          // Find the possible images of the sphere in a periodic unit cell
          findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
          for (auto& pt: periodicLoc) {

            // Find whether the current sphere intersects any other spheres in the list
            // Uses the kd tree.
            if (intersectsAnother(pt, partRad, 
                                        kdtree, searchRadius)) {
              noIntersections = false;
              break;
            }
          } // end loop through images
        }
      }

      // If there are no intersections then add these points
      size_t start = 0, end = 0;
      if (noIntersections) {
        {
          // Add the particle to the particle list
          ParticleInRVE newParticle(ParticleShape::SPHERE, partRad,
                                    rotation, partCent, matCode, thickness);
          s_partList.addParticle(newParticle);
          //newParticle.print();

          // Add to point cloud
          start = cloud.size();
          end = cloud.addPoint(newParticle.getCenter());

          // Add to radius vector
          d_radii.emplace_back(partRad);
        }

        if (periodic) {
          end = start;
          for (auto pt: periodicLoc) {

            // Add the particle to the particle list
            ParticleInRVE newParticle(ParticleShape::SPHERE, partRad,
                                      rotation, pt, matCode, thickness);
            s_partList.addParticle(newParticle);
            //newParticle.print();

            // Add to point cloud
            end = cloud.addPoint(newParticle.getCenter());

            // Add to radius vector
            d_radii.emplace_back(partRad);
          } // End of loop through images
        }

        // Add the particles to the kd tree
        kdtree.addPoints(start, end);

        // Update volume
        // Each set of images of a particle only contributes one volume
        vol += partDia*partDia*partDia*M_PI/6.0;

        // Compute the volume fraction
        vfrac = vol/volBox;

        // Set the fit flag to true
        fit = true;

      } // end of intersection check
    }

    // If there is no fit reduce the particle size and try again
    if (!fit) {
      partDia *= 0.9;
    }
  }

  std::cout << "Final values" << "\n";
  std::cout << "No of parts = " << cloud.size() << " Vol frac = " << vfrac << "\n";
  std::cout << "Volume of parts = " << vol << " Box vol = " << volBox << "\n";
}

//--------------------------------------------------------------------------
// Estimate the number of particles of each size in the RVE
//--------------------------------------------------------------------------
void 
Vaango_UIGenerateRVEParticles::estimateRVEPartSizeDist(double rveSize,
                                                       const ParticleShape& shape) {

  double vf = s_sizeDist.particleVolFrac*0.01;

  std::vector<double> dia;
  std::vector<double> vol;
  std::vector<int> num;
  std::vector<int> scaledNum;

  double totvol = 0.0;
  double volInputRVE = 0.0;
  double volActualRVE = 0.0;
  double scalefac = 1.0;

  switch (shape) {
  case ParticleShape::CIRCLE:
  case ParticleShape::HOLLOW_CIRCLE:

    // Compute area occupied by particles
    volActualRVE = rveSize*rveSize;
    for (int ii = 0; ii < s_sizeDist.numSizesCalc; ++ii) {
      num.push_back(s_sizeDist.freq2DCalc[ii]);
      dia.push_back(s_sizeDist.sizeCalc[ii]);
      vol.push_back(0.25*M_PI*dia.back()*dia.back());
      totvol += (num.back()*vol.back());
    }
    break;

  case ParticleShape::SPHERE:
  case ParticleShape::HOLLOW_SPHERE:

    // Compute area occupied by particles
    volActualRVE = rveSize*rveSize*rveSize;
    for (int ii = 0; ii < s_sizeDist.numSizesCalc; ++ii) {
      num.push_back(s_sizeDist.freq3DCalc[ii]);
      dia.push_back(s_sizeDist.sizeCalc[ii]);
      vol.push_back(M_PI*dia.back()*dia.back()*dia.back()/6.0);
      totvol += (num.back()*vol.back());
    }
    break;
  }

  // Compute volume  of input RVE and Compute scaling factor
  volInputRVE =  totvol/vf;
  scalefac = volActualRVE/volInputRVE;

  //std::cout << "Tot Vol = " << totvol << " Vf = "  << vf  << 
  //                    " Vol Inp RVE = " << volInputRVE  << 
  //                    " Vol Act RVE = " << volActualRVE  << 
  //                    " Scale Fac = " << scalefac << "\n";

  // Compute scaled number for each size
  totvol = 0.0;
  for (int ii = 0; ii < s_sizeDist.numSizesCalc; ++ii) {
    double N = (int) std::round(num[ii]*scalefac);
    scaledNum.push_back(N);
    s_sizeDist.freq2DCalc[ii] = N;
    s_sizeDist.freq3DCalc[ii] = N;
    vol[ii] *= N;
    totvol += vol[ii];
  }

  // Compute new volume frac for each size
  for (int ii = 0; ii < s_sizeDist.numSizesCalc; ii++) {
    double volFrac = 100.0*vol[ii]/totvol;
    s_sizeDist.volFrac2DCalc[ii] = volFrac;
    s_sizeDist.volFrac3DCalc[ii] = volFrac;
  }

  // Print the update particle size distribution
  //s_sizeDist.print();
  //for (int ii = 0; ii < s_sizeDist.numSizesCalc; ii++) {
  //  std::cout << "size: " << s_sizeDist.sizeCalc[ii] 
  //            << " N (2D): " << s_sizeDist.freq2DCalc[ii] 
  //            << " N (3D): " << s_sizeDist.freq3DCalc[ii] << "\n";
  //}

  // Compute volume fraction occupied by the particles in the
  // compute distribution
  double newVolFrac = 0.0;
  double fracComp = s_sizeDist.particleVolFrac/100.0;
  switch (shape) {
    case ParticleShape::CIRCLE:
      newVolFrac = totvol/(rveSize*rveSize);
      break;
    case ParticleShape::SPHERE:
      newVolFrac = totvol/(rveSize*rveSize*rveSize);
      break;
  }
  //std::cout << "Updated volume fraction = " << newVolFrac
  //          << " Target vol. frac. = " << fracComp << "\n";

  // If volume fraction is greater, remove particles
  if (newVolFrac > fracComp ) {
    for (int ii = s_sizeDist.numSizesCalc-1; ii > -1; ii--) {
      s_sizeDist.freq2DCalc[ii] -= 1; 
      s_sizeDist.freq3DCalc[ii] -= 1; 
      double volFrac = 100.0*vol[ii]/totvol;
      s_sizeDist.volFrac2DCalc[ii] -= volFrac;
      s_sizeDist.volFrac3DCalc[ii] -= volFrac;
      totvol -= vol[ii];
      switch (shape) {
        case ParticleShape::CIRCLE:
          newVolFrac = totvol/(rveSize*rveSize);
          break;
        case ParticleShape::SPHERE:
          newVolFrac = totvol/(rveSize*rveSize*rveSize);
        break;
      }
      //std::cout << "Intermediate: Updated volume fraction = " << newVolFrac
      //          << " Target vol. frac. = " << fracComp << "\n";
      if (newVolFrac < fracComp ) {
        break;
      }
    }
  }

  // If the volume fraction is less than that needed, add some of the smaller particles
  if (newVolFrac < 0.95*fracComp ) {
    for (int ii = 0; ii < s_sizeDist.numSizesCalc; ii++) {
      s_sizeDist.freq2DCalc[ii] += 1; 
      s_sizeDist.freq3DCalc[ii] += 1; 
      double volFrac = 100.0*vol[ii]/totvol;
      s_sizeDist.volFrac2DCalc[ii] += volFrac;
      s_sizeDist.volFrac3DCalc[ii] += volFrac;
      totvol += vol[ii];
      switch (shape) {
        case ParticleShape::CIRCLE:
          newVolFrac = totvol/(rveSize*rveSize);
          break;
        case ParticleShape::SPHERE:
          newVolFrac = totvol/(rveSize*rveSize*rveSize);
        break;
      }
      if (newVolFrac > 0.95*fracComp ) {
        break;
      }
    }

  }

  std::cout << "Final: Updated volume fraction = " << newVolFrac
            << " Target vol. frac. = " << fracComp << "\n";
  for (int ii = 0; ii < s_sizeDist.numSizesCalc; ii++) {
    std::cout << "Final: size: " << s_sizeDist.sizeCalc[ii] 
              << " N (2D): " << s_sizeDist.freq2DCalc[ii] 
              << " N (3D): " << s_sizeDist.freq3DCalc[ii] << "\n";
  }

  //std::this_thread::sleep_for(std::chrono::seconds(30));
}

// Return the number of new locations to be tested for periodic distributions of 
// spheres in a cubic box
void 
Vaango_UIGenerateRVEParticles::findPeriodicSpherePartLoc(const Point& center, double diameter, 
                                const Point& rveMin, const Point& rveMax,
                                std::vector<Point>& periodicLoc) const {

  // Get the RVE sizes in the three directions
  double xRVE = rveMax.x - rveMin.x;
  double yRVE = rveMax.y - rveMin.y;
  double zRVE = rveMax.z - rveMin.z;

  // Create a vector of the 26 potential periodic positions.  
  // Most of these will be outside the RVE.
  Point cen(center);
  std::vector<Point> periodicPositions;
  periodicPositions.emplace_back(cen.translate(0.0, yRVE, 0.0));
  periodicPositions.emplace_back(cen.translate(0.0, -yRVE, 0.0));
  periodicPositions.emplace_back(cen.translate(xRVE, 0.0, 0.0));
  periodicPositions.emplace_back(cen.translate(xRVE, yRVE, 0.0));
  periodicPositions.emplace_back(cen.translate(xRVE, -yRVE, 0.0));
  periodicPositions.emplace_back(cen.translate(-xRVE, 0.0, 0.0));
  periodicPositions.emplace_back(cen.translate(-xRVE, yRVE, 0.0));
  periodicPositions.emplace_back(cen.translate(-xRVE, -yRVE, 0.0));

  periodicPositions.emplace_back(cen.translate(0.0, 0.0, zRVE));
  periodicPositions.emplace_back(cen.translate(0.0, yRVE, zRVE));
  periodicPositions.emplace_back(cen.translate(0.0, -yRVE, zRVE));
  periodicPositions.emplace_back(cen.translate(xRVE, 0.0, zRVE));
  periodicPositions.emplace_back(cen.translate(xRVE, yRVE, zRVE));
  periodicPositions.emplace_back(cen.translate(xRVE, -yRVE, zRVE));
  periodicPositions.emplace_back(cen.translate(-xRVE, 0.0, zRVE));
  periodicPositions.emplace_back(cen.translate(-xRVE, yRVE, zRVE));
  periodicPositions.emplace_back(cen.translate(-xRVE, -yRVE, zRVE));

  periodicPositions.emplace_back(cen.translate(0.0, 0.0, -zRVE));
  periodicPositions.emplace_back(cen.translate(0.0, yRVE, -zRVE));
  periodicPositions.emplace_back(cen.translate(0.0, -yRVE, -zRVE));
  periodicPositions.emplace_back(cen.translate(xRVE, 0.0, -zRVE));
  periodicPositions.emplace_back(cen.translate(xRVE, yRVE, -zRVE));
  periodicPositions.emplace_back(cen.translate(xRVE, -yRVE, -zRVE));
  periodicPositions.emplace_back(cen.translate(-xRVE, 0.0, -zRVE));
  periodicPositions.emplace_back(cen.translate(-xRVE, yRVE, -zRVE));
  periodicPositions.emplace_back(cen.translate(-xRVE, -yRVE, -zRVE));

  // Iterate through the vector to find which of the points are relevant
  double rad = 0.5*diameter;
  for (auto& pt : periodicPositions) {

    // Create a box around the point
    Point pointBoxMin = pt.translate(-rad, -rad, -rad);
    Point pointBoxMax = pt.translate(rad, rad, rad);

    // Find if the box intersects the RVE  box
    if (boxBoxIntersect(pointBoxMin, pointBoxMax, rveMin, rveMax)) {
      periodicLoc.emplace_back(pt);
    }
  }

  //std::cout << "Periodic locs : " << periodicLoc.size() << std::endl;
}

bool 
Vaango_UIGenerateRVEParticles::boxBoxIntersect(const Point& ptMin, const Point& ptMax, 
                      const Point& rveMin, const Point& rveMax) const 
{
  if (ptMax.isLessThan(rveMin)) return false;
  if (ptMin.isGreaterThan(rveMax)) return false;
  return true;
}

} // namespace VaangoUI

