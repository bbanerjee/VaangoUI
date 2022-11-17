#ifndef __Vaango_UI_GENERATE_RVE_PARTICLES_H__
#define __Vaango_UI_GENERATE_RVE_PARTICLES_H__

#include <Vaango_UIData.h>

#include <Utils/SearchUtils.h>

#include <cmath>
#include <string>
#include <random>
#include <iostream>
#include <cmath>

namespace VaangoUI {

class Vaango_UIGenerateRVEParticles
{
private:

  std::mt19937_64 d_gen;
  std::uniform_real_distribution<double> d_dist;

public:
  Vaango_UIGenerateRVEParticles()
  {
    d_gen.seed(1234567890);
    d_dist.param(std::uniform_real_distribution<double>::param_type(0, 1));
  }

  ~Vaango_UIGenerateRVEParticles() {}

  //--------------------------------------------------------------------------
  // Method for distributing particles
  //--------------------------------------------------------------------------
  void distributeParticles() {

    // Clean the particle diameter vectors etc. and start afresh
    s_partList.clear();

    // Estimate the number of particles of each size in the RVE
    estimateRVEPartSizeDist();

    // Distribute the particles in the boxes based on the type of 
    // particles
    switch (s_partShapeFlag) {
    case ParticleShape::CIRCLE:
      distributeCircles();
      break;
    case ParticleShape::SPHERE:
      distributeSpheres();
      break;
    }
  }

  //--------------------------------------------------------------------------
  // Distribute circles (distribute the circular particles in a square 
  // box with the given dimensions)
  //--------------------------------------------------------------------------
  void distributeCircles() {

    try {
      constexpr int MAX_ITER = 1000;

      // Rotation and material code are zero
      int matCode = 0;
      double rveSize = s_partList.getRVESize();
      double thickness = 0.0;

      // Pick up each particle and place in the square ..  the largest 
      // particles first
      int nofSizesCalc = s_sizeDist.numSizesCalc;
      for (int ii = nofSizesCalc-1; ii > -1; ii--) {
        int nofParts = s_sizeDist.freq2DCalc[ii];

        double partDia = s_sizeDist.sizeCalc[ii];
        double partDiaNext = 0.0;
        if (ii == 0)
          partDiaNext = 0.5*s_sizeDist.sizeCalc[0];
        else
          partDiaNext = s_sizeDist.sizeCalc[ii-1];

        double thickness = 0.0;
        for (int jj = 0; jj < nofParts; jj++) {

          // Iterate till the particle fits in the box
          bool fit = false;

          int nofIter = 0;
          while (!fit) {

            // Increment the iterations and quit if the MAX_ITER is exceeded
            if (nofIter > MAX_ITER) {
              if (partDia < partDiaNext) break;
              else {
                nofIter = 0;
                partDia *= 0.9;
              }
            }
            nofIter++;

            // Get two random numbers for the x and y and scale to get center
            double xCent = d_dist(d_gen)*rveSize;
            double yCent = d_dist(d_gen)*rveSize;
            Point partCent(xCent, yCent, 0.0);

            // Find if the particle fits in the box
            bool boxFit = isCircleInsideRVE(partDia, xCent, yCent);

            // Find if the particle intersects other particles already
            // placed in the box
            if (boxFit) {
              int nofPartsInVector = s_partList.size();
              bool circlesIntersect = false;
              for (int kk = 0; kk < nofPartsInVector; kk++) {
                auto part = s_partList.getParticle(kk);
                double dia1 = 2.0*part.getRadius();
                Point cent1 = part.getCenter();
                circlesIntersect = doCirclesIntersect(dia1, cent1, partDia, 
                    partCent);
                if (circlesIntersect) break;
              } 
              if (circlesIntersect) fit = false;
              else {

                // Add a particle to the particle list
                ParticleInRVE newParticle(0.5*partDia, rveSize,
                                          thickness, partCent, 
                                          matCode);
                s_partList.addParticle(newParticle);

                // Set flag to true
                fit = true;
              }
            }
          }
        }
      }

      // Compute the volume fraction occupied by particles
      int vecSize = s_partList.size();
      double vol = 0.0;
      for (int ii = 0; ii < vecSize; ii++) {
        double rad = (s_partList.getParticle(ii)).getRadius();
        vol += M_PI*rad*rad;
      }
      double volBox = rveSize*rveSize;
      double vfrac = vol/volBox;
      std::cout << "No of parts = " << vecSize << " Vol frac = " << vfrac << "\n";
      std::cout << "Volume of parts = " << vol << " Box vol = " << volBox << "\n";

      // Fill up the rest with fines
      double partDia = s_sizeDist.sizeCalc[0];
      double fracComp = s_sizeDist.particleVolFrac/100.0;
      while (vfrac < fracComp) {

        bool fit = false;
        int nofIter = 0;
        std::cout << "Part Dia = " << partDia << " Vol frac = " << vfrac << 
            "Vol Frac Comp = " << s_sizeDist.particleVolFrac << "\n";
        while (!fit) {

          // Increment the iterations and quit if the MAX_ITER is exceeded
          if (nofIter > MAX_ITER) break;
          nofIter++;

          // Get two random numbers for the x and y and scale the co-ordinates
          double xCent = d_dist(d_gen)*rveSize;
          double yCent = d_dist(d_gen)*rveSize;
          Point partCent(xCent, yCent, 0.0);

          // Find if the particle fits in the box
          bool boxFit = isCircleInsideRVE(partDia, xCent, yCent);

          // Find if the particle intersects other particles already
          // placed in the box
          if (boxFit) {
            int nofPartsInVector = s_partList.size();
            bool circlesIntersect = false;
            for (int kk = 0; kk < nofPartsInVector; kk++) {
              ParticleInRVE part = s_partList.getParticle(kk);
              double dia1 = 2.0*part.getRadius();
              Point cent1 = part.getCenter();
              circlesIntersect = doCirclesIntersect(dia1, cent1, partDia, 
                  partCent);
              if (circlesIntersect) break;
            } 
            if (circlesIntersect) fit = false;
            else {

              // Add a particle to the particle list
              ParticleInRVE newParticle(0.5*partDia, rveSize,
                                        thickness, partCent, matCode);
              s_partList.addParticle(newParticle);

              fit = true;
            }
          }
        }

        // Calculate the new volume
        if (fit) {
          vfrac += (0.25*M_PI*partDia*partDia)/volBox;
        } else {
          partDia = 0.9*partDia;
        }
      }

      vecSize = s_partList.size();
      vol = 0.0;
      for (int ii = 0; ii < vecSize; ii++) {
        double rad = (s_partList.getParticle(ii)).getRadius();
        vol += M_PI*rad*rad;
      }
      vfrac = vol/volBox;
      std::cout << "No of parts = " << vecSize << " Vol frac = " << (vol/volBox) << "\n";
      std::cout << "Volume of parts = " << vol << " Box vol = " << volBox << "\n";

    } catch (const std::exception& e) {
      std::cout << "Some exception occured in method distributeCircles" << "\n";
    }

  }

  //--------------------------------------------------------------------------
  // Find if circles intersect
  //--------------------------------------------------------------------------
  bool doCirclesIntersect(double dia1, const Point& cent1, 
                          double dia2, const Point& cent2){
    double x1 = cent1.x;
    double y1 = cent1.y;
    double x2 = cent2.x;
    double y2 = cent2.y;
    double distCent = std::sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
    double sumRadii = dia1/2 + dia2/2;
    double gap = distCent - sumRadii;
    if (gap < 0.01*sumRadii) return true;
    //if (sumRadii > distCent) return true;
    return false;
  }

  //--------------------------------------------------------------------------
  // Find if circle is inside the RVE
  //--------------------------------------------------------------------------
  bool isCircleInsideRVE(double dia, double xCent, double yCent)
  {
    // Find if the particle fits in the box
    double rveSize = s_partList.getRVESize();
    double rad = 0.5*dia;
    double xMinPartBox = xCent-rad;
    double xMaxPartBox = xCent+rad;
    double yMinPartBox = yCent-rad;
    double yMaxPartBox = yCent+rad;
    if (xMinPartBox >= 0.0 && xMaxPartBox <= rveSize &&
        yMinPartBox >= 0.0 && yMaxPartBox <= rveSize) {
      return true;
    }
    return false;
  }

  //--------------------------------------------------------------------------
  // Distribute spheres (distribute the spherical particles in a cube 
  // box with the given dimensions)
  //--------------------------------------------------------------------------
  void distributeSpheres() {

    try {

      constexpr int MAX_ITER = 3000;
      double rveSize = s_partList.getRVESize();

      // No rotation needed; material code is 0
      double rotation = 0.0;
      int matCode = 0;
      double thickness = 0.0;
      ParticleShape partShape = ParticleShape::SPHERE;

      // Pick up each particle and place in the cube ..  the largest 
      // particles first
      int nofSizesCalc = s_sizeDist.numSizesCalc;
      for (int ii = nofSizesCalc; ii > 0; ii--) {
        int nofParts = s_sizeDist.freq3DCalc[ii-1];
        double partDia = 0.0;
        double partDiaCurr = 0.0;
        bool fit = false;
        std::cout << "Particle size fraction # = " << ii << "\n";

        for (int jj = 0; jj < nofParts; jj++) {

          // Set up the particle diameter
          std::cout << "Particle # = " << jj << "\n";
          partDia = s_sizeDist.sizeCalc[ii-1];
          partDiaCurr = partDia;

          // Iterate till the particle fits in the box
          fit = false;

          int nofIter = 0;
          while (!fit) {

            // Increment the iterations and quit if the MAX_ITER is exceeded
            nofIter++;
            if (nofIter > MAX_ITER) break;

            // Get three random numbers for the x,y and z and scale
            double xCent = d_dist(d_gen)*rveSize;
            double yCent = d_dist(d_gen)*rveSize;
            double zCent = d_dist(d_gen)*rveSize;
            Point partCent(xCent, yCent, zCent);

            // Find if the particle fits in the box
            bool boxFit = isSphereInsideRVE(partDia, xCent, yCent, zCent);

            // Find if the particle intersects other particles already
            // placed in the box
            if (boxFit) {
              bool spheresIntersect = false;
              int nofPartsInVector = s_partList.size();
              for (int kk = 0; kk < nofPartsInVector; kk++) {

                // Get the particle
                ParticleInRVE part = s_partList.getParticle(kk);
                double dia1 = 2.0*part.getRadius();
                Point cent1 = part.getCenter();
                spheresIntersect = doSpheresIntersect(dia1, cent1, partDia, 
                    partCent);
                if (spheresIntersect) break;
              } 
              if (spheresIntersect) fit = false;
              else {

                // Add a particle to the particle list
                ParticleInRVE newParticle(partShape, 0.5*partDia,
                                          rotation, partCent, matCode,
                                          thickness);
                s_partList.addParticle(newParticle);
                std::cout << newParticle << "\n";

                // if the fit is not perfect fit the remaining volume
                // again
                if (partDiaCurr != partDia) {
                  partDia = 
                      std::pow(std::pow(partDiaCurr,3)-std::pow(partDia,3),
                          (1.0/3.0));
                  partDiaCurr = partDia;
                  nofIter = 0;
                  fit = false;
                } else {
                  fit = true;
                }
              }
            }
          }
        }
      }

      // calculate the volume of the particles
      int vecSize = s_partList.size();
      double vol = 0.0;
      for (int ii = 0; ii < vecSize; ii++) {
        double dia = 2.0*s_partList.getParticle(ii).getRadius();
        vol += dia*dia*dia*M_PI/6.0;
      }
      double volBox = std::pow(rveSize,3);
      double vfrac = vol/volBox;
      std::cout << "No of parts = " << vecSize << " Vol frac = " << (vol/volBox) << "\n";
      std::cout << "Volume of parts = " << vol << " Box vol = " << volBox << "\n";

      // Fill up the rest with fines 
      double partDia = s_sizeDist.sizeCalc[0];
      double fracComp = s_sizeDist.particleVolFrac/100.0;
      while (vfrac < fracComp) {

        bool fit = false;
        int nofIter = 0;
        std::cout << "Part Dia = " << partDia << " Vol frac = " << vfrac << 
            "Vol Frac = " << s_sizeDist.particleVolFrac << "\n";
        while (!fit) {

          // Increment the iterations and quit if the MAX_ITER is exceeded
          if (nofIter > MAX_ITER) break;
          nofIter++;

          // Get two random numbers for the x and y and scale the co-ordinates
          double xCent = d_dist(d_gen)*rveSize;
          double yCent = d_dist(d_gen)*rveSize;
          double zCent = d_dist(d_gen)*rveSize;
          Point partCent(xCent, yCent, zCent);

          // Find if the particle fits in the box
          bool boxFit = isSphereInsideRVE(partDia, xCent, yCent, zCent);

          // Find if the particle intersects other particles already
          // placed in the box
          if (boxFit) {
            int nofPartsInVector = s_partList.size();
            bool spheresIntersect = false;
            for (int kk = 0; kk < nofPartsInVector; kk++) {

              // Get the particle
              ParticleInRVE part = s_partList.getParticle(kk);
              double dia1 = 2.0*part.getRadius();
              Point cent1 = part.getCenter();
              spheresIntersect = doSpheresIntersect(dia1, cent1, partDia, 
                  partCent);
              if (spheresIntersect) break;
            } 
            if (spheresIntersect) fit = false;
            else {

              // Add a particle to the particle list
              ParticleInRVE newParticle(partShape, 0.5*partDia,
                                        rotation, partCent, matCode,
                                        thickness);
              s_partList.addParticle(newParticle);
              // std::cout << newParticle << "\n";

              fit = true;
            }
          }
        }

        // Calculate the new volume
        if (fit) {
          vfrac += std::pow(partDia,3)*M_PI/(6.0*volBox);
        } else {
          partDia *= 0.9;
        }
      }
      vecSize = s_partList.size();
      vol = 0.0;
      for (int ii = 0; ii < vecSize; ii++) {
        double dia = 2.0*s_partList.getParticle(ii).getRadius();
        vol += dia*dia*dia*M_PI/6.0;
      }
      vfrac = vol/volBox;
      std::cout << "Final values" << "\n";
      std::cout << "No of parts = " << vecSize << " Vol frac = " << (vol/volBox) << "\n";
      std::cout << "Volume of parts = " << vol << " Box vol = " << volBox << "\n";

    } catch (const std::exception& e) {
      std::cout << "Some exception occured in method distributeSpheres" << "\n";
    }
  }

  //--------------------------------------------------------------------------
  // Find if sphere is inside the RVE
  //--------------------------------------------------------------------------
  bool isSphereInsideRVE(double dia, double xCent, double yCent,
                         double zCent) 
  {

    // Find if the particle fits in the box
    double rveSize = s_partList.getRVESize();
    double rad = 0.5*dia;
    double xMinPartBox = xCent-rad;
    double xMaxPartBox = xCent+rad;
    double yMinPartBox = yCent-rad;
    double yMaxPartBox = yCent+rad;
    double zMinPartBox = zCent-rad;
    double zMaxPartBox = zCent+rad;
    if (xMinPartBox >= 0.0 && xMaxPartBox <= rveSize &&
        yMinPartBox >= 0.0 && yMaxPartBox <= rveSize &&
        zMinPartBox >= 0.0 && zMaxPartBox <= rveSize) {
      return true;
    }
    return false;
  }

  //--------------------------------------------------------------------------
  // Find if spheres intersect
  //--------------------------------------------------------------------------
  bool doSpheresIntersect(double dia1, Point cent1, 
      double dia2, Point cent2) {
    double x1 = cent1.x;
    double y1 = cent1.y;
    double z1 = cent1.z;
    double x2 = cent2.x;
    double y2 = cent2.y;
    double z2 = cent2.z;

    double distCent = 
        std::sqrt(std::pow((x2-x1),2)+std::pow((y2-y1),2)+std::pow((z2-z1),2));
    double sumRadii = dia1/2 + dia2/2;
    if (sumRadii > distCent) return true;
    return false;
  }


  //--------------------------------------------------------------------------
  // Method for distributing particles
  //--------------------------------------------------------------------------
  void periodicParticleDist() {

    // Clean the particle diameter vectors etc. and start afresh
    s_partList.clear();

    // Estimate the number of particles of each size in the RVE
    estimateRVEPartSizeDist();

    // Distribute the particles in the boxes based on the type of 
    // particles
    switch (s_partShapeFlag) {
    case ParticleShape::CIRCLE:
      distributeCirclesPeriodic();
      break;
    case ParticleShape::SPHERE:
      distributeSpheresPeriodic();
      break;
    }
  }

  //--------------------------------------------------------------------------
  // Estimate the number of particles of each size in the RVE
  //--------------------------------------------------------------------------
  void estimateRVEPartSizeDist() {

    double rveSize = s_partList.getRVESize();
    double vf = s_sizeDist.particleVolFrac*0.01;

    std::vector<double> dia;
    std::vector<double> vol;
    std::vector<int> num;
    std::vector<int> scaledNum;

    double totvol = 0.0;
    double volInputRVE = 0.0;
    double volActualRVE = 0.0;
    double scalefac = 1.0;

    switch (s_partShapeFlag) {
    case ParticleShape::CIRCLE:

      // Compute area occupied by particles
      volActualRVE = rveSize*rveSize;
      for (int ii = 0; ii < s_sizeDist.numSizesCalc; ++ii) {
        num[ii] = s_sizeDist.freq2DCalc[ii];
        dia[ii] = s_sizeDist.sizeCalc[ii];
        vol[ii] = 0.25*M_PI*dia[ii]*dia[ii];
        totvol += (num[ii]*vol[ii]);
      }
      break;

    case ParticleShape::SPHERE:

      // Compute area occupied by particles
      volActualRVE = rveSize*rveSize*rveSize;
      for (int ii = 0; ii < s_sizeDist.numSizesCalc; ++ii) {
        num[ii] = s_sizeDist.freq3DCalc[ii];
        dia[ii] = s_sizeDist.sizeCalc[ii];
        vol[ii] = M_PI*dia[ii]*dia[ii]*dia[ii]/6.0;
        totvol += (num[ii]*vol[ii]);
      }
      break;
    }

    // Compute volume  of input RVE and Compute scaling factor
    volInputRVE =  totvol/vf;
    scalefac = volActualRVE/volInputRVE;

    //std::cout << "Tot Vol = " << totvol << " Vf = "  << vf  << 
    //                   " Vol Inp RVE = " << volInputRVE  << 
    //                   " Vol Act RVE = " << volActualRVE  << 
    //                   " Scale Fac = " << scalefac);

    // Compute scaled number for each size
    totvol = 0.0;
    for (int ii = 0; ii < s_sizeDist.numSizesCalc; ++ii) {
      scaledNum[ii] = (int) std::round(num[ii]*scalefac);
      s_sizeDist.freq2DCalc[ii] = scaledNum[ii];
      s_sizeDist.freq3DCalc[ii] = scaledNum[ii];
      totvol += (scaledNum[ii]*vol[ii]);
    }

    // Compute new volume frac for each size
    for (int ii = 0; ii < s_sizeDist.numSizesCalc; ii++) {
      double volFrac = 100.0*vol[ii]*scaledNum[ii]/totvol;
      s_sizeDist.volFrac2DCalc[ii] = volFrac;
      s_sizeDist.volFrac3DCalc[ii] = volFrac;
    }

    // Print the update particle size distribution
    //s_sizeDist.print();

    // Compute volume fraction occupied by the particles in the
    // compute distribution
    double newVolFrac = 0.0;
    double fracComp = s_sizeDist.particleVolFrac/100.0;
    switch (s_partShapeFlag) {
      case ParticleShape::CIRCLE:
        newVolFrac = totvol/(rveSize*rveSize);
        break;
      case ParticleShape::SPHERE:
        newVolFrac = totvol/(rveSize*rveSize*rveSize);
        break;
    }
    std::cout << "Updated volume fraction = " << newVolFrac
              << " Target vol. frac. = " << fracComp << "\n";

    // If the volume fraction is less than that needed, add some of the larger particles
    while (newVolFrac < 0.95*fracComp ) {
      for (int ii = 0; ii < s_sizeDist.numSizesCalc; ii++) {
        if (s_sizeDist.freq2DCalc[ii] == 0) {
          s_sizeDist.freq2DCalc[ii] = 1; 
          s_sizeDist.freq3DCalc[ii] = 1; 
          totvol += vol[ii];
          break;
        }
      }

      for (int ii = 0; ii < s_sizeDist.numSizesCalc; ii++) {
        double volFrac = 100.0*vol[ii]/totvol;
        s_sizeDist.volFrac2DCalc[ii] = volFrac;
        s_sizeDist.volFrac3DCalc[ii] = volFrac;
      }

      switch (s_partShapeFlag) {
      case ParticleShape::CIRCLE:
        newVolFrac = totvol/(rveSize*rveSize);
        break;
      case ParticleShape::SPHERE:
        newVolFrac = totvol/(rveSize*rveSize*rveSize);
        break;
      }
      std::cout << "Updated volume fraction = " << newVolFrac
                << " Target vol. frac. = " << fracComp << "\n";
    }
  }

  //--------------------------------------------------------------------------
  // Create a periodic distribution of particles in the box.  Similar
  // approach to random sequential packing of distributeCircles
  //--------------------------------------------------------------------------
  void distributeCirclesPeriodic() {

    constexpr int MAX_ITER = 2000;
    double rveSize = s_partList.getRVESize();
    double thickness = 0;

    // Set material code to zero
    int matCode = 0;

    // Clean the particle diameter vectors etc. and start afresh
    s_partList.clear();
    std::vector<Point> centers;
    std::vector<double> radii;

    // Create a kd tree for storing and searching the center locations
    // Construct kd-tree index
    ParticlePointCloud cloud(centers, radii);
    ParticleKDTree2D kdtree(2, cloud, {10});

    // Max number of nearest neighbors to be returned from kd tree
    int maxSearchPoints = 50;

    // Get the number of particle sizes
    int nofSizesCalc = s_sizeDist.numSizesCalc;

    // Compute the rve volume
    double rveVolume = rveSize*rveSize;
    
    // Make a copy of the target number of particles of each size
    std::vector<int> targetNofParts(s_sizeDist.freq2DCalc);

    // The sizes are distributed with the smallest first.  Pick up
    // the largest size and iterate down through smaller sizes
    double totalVolume = 0.0;
    double volFrac = totalVolume/rveVolume;
    double targetPartVolFrac = 0.0;
    for (int ii = nofSizesCalc; ii > 0; ii--) {

      // Get the number of particles for the current size
      int nofParts = s_sizeDist.freq2DCalc[ii-1];
      std::cout << "Particle Size = " <<  s_sizeDist.sizeCalc[ii-1]<<  
                         " Particles = " << nofParts << "\n";

      // Get the particle size
      double partRad = 0.5*s_sizeDist.sizeCalc[ii-1];
      double partVol = M_PI*partRad*partRad;
      targetPartVolFrac += (double) targetNofParts[ii-1]*partVol/rveVolume;

      // Increase the size of the box so that periodic distributions
      // are allowed
      double boxMin = -0.9*partRad;
      double boxMax = rveSize+0.9*partRad;

      // Calculate the limits of the box outside which periodic bcs
      // come into play
      double boxInMin = partRad;
      double boxInMax = rveSize-partRad;

      // Pick up each particle and insert it into the box
      //std::cout << "No. of particles to be inserted = "+nofParts);
      int numFitted = 0;
      for (int jj = 0; jj < nofParts; jj++) {

        bool fit = false;
        int nofIter = 0;
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
            if (!intersectsAnotherCircle(partCent, 2.0*partRad,
                                         kdtree, maxSearchPoints)) {

              // Add a particle to the particle list
              ParticleInRVE newParticle(partRad, rveSize, 
                                        thickness, partCent, matCode);
              s_partList.addParticle(newParticle);

              //newParticle.print();
              totalVolume += newParticle.getVolume();

              // Add the particle to the kd tree
              size_t index = cloud.addPoint(partCent, partRad);
              kdtree.addPoints(index, index);

              fit = true;
              ++numFitted;
            }
            ++nofIter;

          } else {

            // Check if this particle intersects another
            if (!intersectsAnotherCircle(partCent, 2.0*partRad,
                                         kdtree, maxSearchPoints)) {

              // Particle is partially outside the box  ... create periodic 
              // images and check each one (there are eight possible locations 
              // of the // center
              std::vector<Point> loc;
              int nofLoc = findPartLoc(rveSize, partRad, partCent, 0, rveSize,
                                       loc);

              bool intersects = false;
              for (auto pt : loc) {
                if (intersectsAnotherCircle(pt, 2.0*partRad,
                                            kdtree, maxSearchPoints)) {
                  intersects = true;
                  break;
                }                           
              }

              if (!intersects) {

                // Add the original particle to the particle list
                size_t start, end;
                {
                  ParticleInRVE newParticle(partRad, rveSize, 
                                            thickness, partCent, matCode);
                  s_partList.addParticle(newParticle);

                  //newParticle.print();
                  totalVolume += newParticle.getVolume();

                  // Add the particle to the point cloud
                  start = cloud.addPoint(partCent, partRad);
                }

                // Add the periodic particles
                for (auto pt: loc) {

                  ParticleInRVE newParticle(partRad, rveSize, 
                                            thickness, pt, matCode);
                  s_partList.addParticle(newParticle);

                  //newParticle.print();
                  totalVolume += newParticle.getVolume();

                  // Add the particle to the point cloud
                  end = cloud.addPoint(partCent, partRad);
                }
  
                // Add the particle to the kd tree
                kdtree.addPoints(start, end);
              }
            }
            ++nofIter;
          }
          if (nofIter%MAX_ITER == 0) {
            partRad *= 0.995;
            // std::cout << "No. of Iterations = " <<  nofIter  
            //           << " Particle Radius = " <<  partRad << "\n";
            nofIter = 0;
          }
        }
      } // end for jj < nofParts

      volFrac = totalVolume/rveVolume;
      targetPartVolFrac = std::min(targetPartVolFrac, 
                                   s_sizeDist.particleVolFrac/100.0);
      std::cout << " Particles fitted = " << numFitted 
                << " Vol. Frac. = " << volFrac
                << " Target vf = " << targetPartVolFrac 
                << " partRad = " << partRad << "\n";
      double volFracDiff = volFrac - targetPartVolFrac; 
      if (volFracDiff < 0.0) {
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
    } // end for ii < nofSizes
    std::cout << "RVE volume = " << rveVolume
              << " Total particle volume = " << totalVolume
              << " Volume fraction = " << totalVolume/rveVolume << "\n";
  }

  bool inLimits(double x, double min, double max) {
    if (x == min || x == max || (x > min && x < max)) return true;
    return false;
  }

  //--------------------------------------------------------------------------
  // Distribute spheres in a periodic unit cell (distribute the spherical particles in a cube 
  // box with the given dimensions)
  //--------------------------------------------------------------------------
  void distributeSpheresPeriodic() {

    // Set up some values that don't change
    constexpr int MAX_ITER = 3000;
    double rveSize = s_partList.getRVESize();
    double thickness = 0;

    // Max number of nearest neighbors to be returned from kd tree
    constexpr int maxSearchPoints = 40;

    // No rotation needed; material code is 0
    double rotation = 0.0;
    int matCode = 0;

    // Clean the particle diameter vectors etc. and start afresh
    s_partList.clear();
    std::vector<Point> centers;
    std::vector<double> radii;
    
    // Set up the limits of the RVE box
    Point rveMin(0.0, 0.0, 0.0);
    Point rveMax(rveSize, rveSize, rveSize);

    // Create a kd tree for storing and searching the center locations
    // Construct kd-tree index
    ParticlePointCloud cloud(centers, radii);
    ParticleKDTree3D kdtree(3, cloud, {10});

    // Set up maximum search distance (this is equal to the largest particle
    // diameter)
    int nofSizesCalc = s_sizeDist.numSizesCalc;

    // Initialize the volume of the particles
    double vol = 0.0;

    // Pick up each particle and place in the cube ..  the largest 
    // particles first
    for (int ii = nofSizesCalc; ii > 0; ii--) {
      int nofParts = s_sizeDist.freq3DCalc[ii-1];
      double partDia = s_sizeDist.sizeCalc[ii-1];

      for (int jj = 0; jj < nofParts; jj++) {

        // Set up the particle diameter
        std::cout << "Particle size fraction # = " << ii
                  << " Particle # = " << jj << "\n";

        // Increase the size of the box so that periodic distributions
        // are allowed
        double boxMin = -0.45*partDia;
        double boxMax = rveSize+0.45*partDia;

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

          double radius = 0.5*partDia;
          size_t start = 0, end = 0;

          // If the size of the tree is zero, just put the particles in without
          // checking intersections
          if (kdtree.getAllIndices().size() == 0) {

            {
              // Add the particle to the particle list
              ParticleInRVE newParticle(s_partShapeFlag, radius,
                                        rotation, partCent, matCode, thickness);
              s_partList.addParticle(newParticle);
              //newParticle.print();

              // Add to point cloud
              start = cloud.addPoint(partCent, radius);
            }

            // The sphere does not necessarily fit completely in the box.  
            // Place it in a periodic manner.
            // Find the possible images of the sphere in a periodic unit cell
            std::vector<Point> periodicLoc;
            findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);

            for (auto& pt: periodicLoc) {

              // Add the particle to the particle list
              ParticleInRVE newParticle(s_partShapeFlag, radius,
                                        rotation, pt, matCode, thickness);
              s_partList.addParticle(newParticle);
              //newParticle.print();

              // Add to point cloud
              end = cloud.addPoint(partCent, radius);
            }

            // Add the particles to the kd tree
            kdtree.addPoints(start, end);

            // Update volume and set the fit flag to true
            // Each set of images of a particle only contributes one volume
            vol += partDia*partDia*partDia*M_PI/6.0;
            fit = true;

          } else { // If the kd tree contains points

            bool noIntersections = true;

            // Find whether the current sphere intersects any other spheres in the list
            // Uses the kd tree.
            if (intersectsAnotherSphere(partCent, partDia, 
                                        kdtree, maxSearchPoints)) {
              noIntersections = false;
            }

            std::vector<Point> periodicLoc;
            if (noIntersections) {

              // The sphere does not necessarily fit completely in the box.  
              // Place it in a periodic manner.
              // Find the possible images of the sphere in a periodic unit cell
              findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
              for (auto& pt: periodicLoc) {

                // Find whether the current sphere intersects any other spheres in the list
                // Uses the kd tree.
                if (intersectsAnotherSphere(pt, partDia, 
                                            kdtree, maxSearchPoints)) {
                  noIntersections = false;
                  break;
                }
              } // end loop through images
            }

            // If there are no intersections then add these points
            if (noIntersections) {

              {
                // Add the particle to the particle list
                ParticleInRVE newParticle(s_partShapeFlag, radius,
                                          rotation, partCent, matCode, thickness);
                s_partList.addParticle(newParticle);
                //newParticle.print();

                // Add to point cloud
                start = cloud.addPoint(partCent, radius);
              }

              for (auto pt: periodicLoc) {

                // Add the particle to the particle list
                ParticleInRVE newParticle(s_partShapeFlag, radius,
                                          rotation, pt, matCode, thickness);
                s_partList.addParticle(newParticle);
                //newParticle.print();

                // Add to point cloud
                end = cloud.addPoint(partCent, radius);

              } // End of loop through images

              // Add the particles to the kd tree
              kdtree.addPoints(start, end);

              // Update volume and set the fit flag to true
              // Each set of images of a particle only contributes one volume
              vol += partDia*partDia*partDia*M_PI/6.0;
              fit = true;

            } // end of intersection check
          } // end of kd-tree if 
        } // end while not fit
      } // end no of parts loop
    } // end no of part sizes loop

    // calculate the volume of the particles
    double volBox = std::pow(rveSize,3);
    double vfrac = vol/volBox;

    // Fill up the rest with fines 
    double partDia = s_sizeDist.sizeCalc[0];
    double fracComp = s_sizeDist.particleVolFrac/100.0;

    std::cout << "After Stage 1: No of parts = " << s_partList.size()
              << " Vol frac = " << vfrac << " MaxFrac" << fracComp << "\n";
    std::cout << " Volume of parts = " << vol << " Box vol = " << volBox << "\n";

    while (vfrac < fracComp) {

      bool fit = false;
      int nofIter = 0;
      std::cout << "Part Dia = " << partDia << " Vol frac = " << vfrac
                << " Target Vol Frac = " << s_sizeDist.particleVolFrac << "\n";

      // Increase the size of the box so that periodic distributions
      // are allowed
      double boxMin = -0.45*partDia;
      double boxMax = rveSize+0.45*partDia;

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
        if (intersectsAnotherSphere(partCent, partDia, 
                                    kdtree, maxSearchPoints)) {
          noIntersections = false;
        }

        std::vector<Point> periodicLoc;
        if (noIntersections) {

          // The sphere does not necessarily fit completely in the box.  
          // Place it in a periodic manner.
          // Find the possible images of the sphere in a periodic unit cell
          findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
          for (auto& pt: periodicLoc) {

            // Find whether the current sphere intersects any other spheres in the list
            // Uses the kd tree.
            if (intersectsAnotherSphere(pt, partDia, 
                                        kdtree, maxSearchPoints)) {
              noIntersections = false;
              break;
            }
          } // end loop through images
        }

        // If there are no intersections then add these points
        size_t start = 0, end = 0;
        double radius = 0.5*partDia;
        if (noIntersections) {
          {
            // Add the particle to the particle list
            ParticleInRVE newParticle(s_partShapeFlag, radius,
                                      rotation, partCent, matCode, thickness);
            s_partList.addParticle(newParticle);
            //newParticle.print();

            // Add to point cloud
            start = cloud.addPoint(partCent, radius);
          }

          for (auto pt: periodicLoc) {

            // Add the particle to the particle list
            ParticleInRVE newParticle(s_partShapeFlag, radius,
                                      rotation, pt, matCode, thickness);
            s_partList.addParticle(newParticle);
            //newParticle.print();

            // Add to point cloud
            end = cloud.addPoint(partCent, radius);

          } // End of loop through images

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
      if (!fit) partDia *= 0.9;
    }

    std::cout << "Final values" << "\n";
    std::cout << "No of parts = " << s_partList.size() << " Vol frac = " << vfrac << "\n";
    std::cout << "Volume of parts = " << vol << " Box vol = " << volBox << "\n";

    // Test whether there are spheres that intersect
    int nofPartsInVector = s_partList.size();
    bool spheresIntersect = false;
    for (int jj = 0; jj < nofPartsInVector-1; jj++) {
      ParticleInRVE partj = s_partList.getParticle(jj);
      double diaj = 2.0*partj.getRadius();
      Point centj = partj.getCenter();
      for (int kk = jj+1; kk < nofPartsInVector; kk++) {
        ParticleInRVE partk = s_partList.getParticle(kk);
        double diak = 2.0*partk.getRadius();
        Point centk = partk.getCenter();
        spheresIntersect = doSpheresIntersect(diaj, centj, diak, centk);
        if (spheresIntersect) {
          std::cout << "Some spheres intersect" << "\n";
          std::cout << " Particle J = " << centj << " Dia = " <<  diaj << "\n";
          std::cout << " Particle K = " << centk << " Dia = " <<  diak << "\n";
        }
      } 
    }
  }

  // Find whether the current circle intersects another circle from the existing 
  // particle list
  bool intersectsAnotherCircle(Point center, double diameter, 
                               ParticleKDTree2D& kdtree, int maxSearchPoints = 100) {

    // Create an array in the form needed by the kd-tree
    double queryPoint[4] = {center.x, center.y, center.z, 0.5*diameter};

    // Find the neighbors within the search radius of the
    // point.  The search radius = 2*diameter of the particle.
    const double searchRadiusSq = 4*diameter*diameter;
    std::vector<std::pair<size_t, double>> indices_dists;
    nanoflann::RadiusResultSet<double, size_t> resultSet(searchRadiusSq, indices_dists);
    kdtree.findNeighbors(resultSet, queryPoint);

    // Loop through the nearest neighbors
    for (auto data : resultSet.m_indices_dists) {

      // Get the stored index from the kd tree
      size_t index = data.first;

      // Get the particle using the kd tree index
      ParticleInRVE part = s_partList.getParticle(index);
      double neighborDiameter = 2.0*part.getRadius();
      Point neighborCenter = part.getCenter();
      bool circlesIntersect = 
          doCirclesIntersect(neighborDiameter, neighborCenter, diameter, center);
      if (circlesIntersect) return true;
    } // end of while iterator 

    return false;
  }

  // Find whether the current sphere intersects another sphere from the existing 
  // particle list
  bool intersectsAnotherSphere(Point center, double diameter, 
                               const ParticleKDTree3D& kdtree, 
                               int maxSearchPoints = 50) {

    // Create an array in the form needed by the kd-tree
    double queryPoint[4] = {center.x, center.y, center.z, 0.5*diameter};

    // Find the neighbors within the search radius of the
    // point.  The search radius is the maximum search distance +
    // the diameter of the particle.
    const double searchRadiusSq = 4*diameter*diameter;
    std::vector<std::pair<size_t, double>> indices_dists;
    nanoflann::RadiusResultSet<double, size_t> resultSet(searchRadiusSq, indices_dists);
    kdtree.findNeighbors(resultSet, queryPoint);

    // Loop through the nearest neighbors
    for (auto data : resultSet.m_indices_dists) {

      // Get the stored index from the kd tree
      size_t index = data.first;

      // Get the particle using the kd tree index
      ParticleInRVE part = s_partList.getParticle(index);
      double neighborDiameter = 2.0*part.getRadius();
      Point neighborCenter = part.getCenter();
      bool spheresIntersect = 
          doSpheresIntersect(neighborDiameter, neighborCenter, diameter, center);
      if (spheresIntersect) return true;

    } // end of while iterator 

    /*
    if (diameter == 200.0) {
      std::cout << "No intersections: Point = " << center
                << "] Dia = " << diameter 
                << " Number searched = " << count << "\n";
    }
    */

    return false;
  }

  // Return the number of new circle locations for period distributions
  int findPartLoc(double rveSize,
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

  // Return the number of new locations to be tested for periodic distributions of 
  // spheres in a cubic box
  void findPeriodicSpherePartLoc(Point center, double diameter, 
                                 Point rveMin, Point rveMax,
                                 std::vector<Point>& periodicLoc) {

    // Get the RVE sizes in the three directions
    double xRVE = rveMax.x - rveMin.x;
    double yRVE = rveMax.y - rveMin.y;
    double zRVE = rveMax.z - rveMin.z;

    // Create a vector of the 26 potential periodic positions.  
    // Most of these will be outside the RVE.
    std::vector<Point> periodicPositions;
    periodicPositions.emplace_back(center.translate(0.0, yRVE, 0.0));
    periodicPositions.emplace_back(center.translate(0.0, -yRVE, 0.0));
    periodicPositions.emplace_back(center.translate(xRVE, 0.0, 0.0));
    periodicPositions.emplace_back(center.translate(xRVE, yRVE, 0.0));
    periodicPositions.emplace_back(center.translate(xRVE, -yRVE, 0.0));
    periodicPositions.emplace_back(center.translate(-xRVE, 0.0, 0.0));
    periodicPositions.emplace_back(center.translate(-xRVE, yRVE, 0.0));
    periodicPositions.emplace_back(center.translate(-xRVE, -yRVE, 0.0));

    periodicPositions.emplace_back(center.translate(0.0, 0.0, zRVE));
    periodicPositions.emplace_back(center.translate(0.0, yRVE, zRVE));
    periodicPositions.emplace_back(center.translate(0.0, -yRVE, zRVE));
    periodicPositions.emplace_back(center.translate(xRVE, 0.0, zRVE));
    periodicPositions.emplace_back(center.translate(xRVE, yRVE, zRVE));
    periodicPositions.emplace_back(center.translate(xRVE, -yRVE, zRVE));
    periodicPositions.emplace_back(center.translate(-xRVE, 0.0, zRVE));
    periodicPositions.emplace_back(center.translate(-xRVE, yRVE, zRVE));
    periodicPositions.emplace_back(center.translate(-xRVE, -yRVE, zRVE));

    periodicPositions.emplace_back(center.translate(0.0, 0.0, -zRVE));
    periodicPositions.emplace_back(center.translate(0.0, yRVE, -zRVE));
    periodicPositions.emplace_back(center.translate(0.0, -yRVE, -zRVE));
    periodicPositions.emplace_back(center.translate(xRVE, 0.0, -zRVE));
    periodicPositions.emplace_back(center.translate(xRVE, yRVE, -zRVE));
    periodicPositions.emplace_back(center.translate(xRVE, -yRVE, -zRVE));
    periodicPositions.emplace_back(center.translate(-xRVE, 0.0, -zRVE));
    periodicPositions.emplace_back(center.translate(-xRVE, yRVE, -zRVE));
    periodicPositions.emplace_back(center.translate(-xRVE, -yRVE, -zRVE));

    // Iterate through the vector to find which of the points are relevant
    double rad = 0.5*diameter;
    for (auto pt : periodicPositions) {

      // Create a box around the point
      Point pointBoxMin = pt.translate(-rad, -rad, -rad);
      Point pointBoxMax = pt.translate(rad, rad, rad);

      // Find if the box intersects the RVE  box
      if (boxBoxIntersect(pointBoxMin, pointBoxMax, rveMin, rveMax)) {
        periodicLoc.emplace_back(pt);
      }
    }
  }

  bool boxBoxIntersect(Point ptMin, Point ptMax, Point rveMin, Point rveMax) 
  {
    if (ptMax.isLessThan(rveMin)) return false;
    if (ptMin.isGreaterThan(rveMax)) return false;
    return true;
  }
};

} // namespace VaangoUI

#endif //__Vaango_UI_GENERATE_RVE_PARTICLES_H__