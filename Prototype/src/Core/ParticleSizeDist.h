#ifndef __Vaango_UI_PARTICLE_SIZE_DIST_H__
#define __Vaango_UI_PARTICLE_SIZE_DIST_H__

#include <string>
#include <vector>
#include <cmath>
#include <iostream>

namespace VaangoUI {

struct ParticleSizeDist
{
  std::string materialName;
  double particleVolFrac;
  double maxParticleSize;
  double numSizes;
  std::vector<double> size;
  std::vector<double> volFrac;

  double numSizesCalc;
  std::vector<int> freq2DCalc;
  std::vector<int> freq3DCalc;
  std::vector<double> sizeCalc;
  std::vector<double> volFrac2DCalc;
  std::vector<double> volFrac3DCalc;

  struct Balls {
    int numBalls2D;
    int numBalls3D;
    double ballDia;
    double vol2D;
    double vol3D;
  };

  ParticleSizeDist() {
    materialName = "default";
    particleVolFrac = 50.0;
    numSizes = 10; 
    maxParticleSize = 1000;
    for (int ii = 0; ii < numSizes; ii++) {
      size.push_back((ii+1)/(float)numSizes*maxParticleSize);
      volFrac.push_back(10.0);
    }
    numSizesCalc = 0; 
  }

  void readFromFile(const std::string& filename) {

  }

  void saveToFile(const std::string& filename) {

  }

  // Calculate the particle distribution to be used in the generation
  // of random particle locations for the Generalized Method of Cells
  // and other applications
  void calcParticleDist() {

    std::cout << "Input data: \n";
    std::cout << materialName << " "
              << particleVolFrac << " "
              << numSizes << " "
              << maxParticleSize << "\n";
    for (int ii = 0; ii < numSizes; ii++) {
      std::cout << "( " << size[ii] << ", " << volFrac[ii] << "), ";
    }
    std::cout << "\n";

    // The max number of calculated particle sizes is 10
    constexpr int NUM_SIZES_MAX = 11;
    constexpr int LARGE_INT = 100000;

    // Read the (almost) continuous distribution
    if (numSizes == 0) return;

    // If the distribution contains only one size then the material
    // is monodispersed and we don't need any further information
    if (numSizes == 1) {

      // Copy the rest of the data into d_PartSizeDist
      std::cout << "Composite" << "\n";
      std::cout << "Size .. Number " << "\n";
      int totBalls = LARGE_INT;
      numSizesCalc = 1;
      sizeCalc.push_back(size[0]);
      freq2DCalc.push_back(totBalls);
      freq3DCalc.push_back(totBalls);
      std::cout << size[0] << "    " << totBalls << "\n";
      std::cout << " Total   " << totBalls << "\n";
      return;
    }

    // Compute a range of mean sizes and mean volume fractions
    std::vector<double> meanSizeCalc;
    std::vector<double> meanVolFracCalc;
    if (numSizes > 0) {
      double minSize = size[0];
      double maxSize = maxParticleSize;
      double sizeIncr = (maxSize-minSize)/(NUM_SIZES_MAX-1);
      if (volFrac[0] > 0.0) {
        sizeCalc.push_back(0.5*minSize);
      } else {
        sizeCalc.push_back(minSize);
      }
      for (int ii = 1; ii < NUM_SIZES_MAX; ++ii) {
        sizeCalc.push_back(minSize + ii*sizeIncr);
      }
      for (int ii = 0; ii < NUM_SIZES_MAX-1; ++ii) {
        double size_start = sizeCalc[ii];
        double size_end = sizeCalc[ii+1];
        double mean = 0.5*(size_start + size_end);

        double intp = 0.0;
        for (int jj = 0; jj < numSizes; ++jj) {
          size_start = 0.0;
          if (jj > 0) size_start = size[jj-1];
          size_end = size[jj];
          double tt = (mean-size_start)/(size_end - size_start);
          if (tt >= 0.0 && tt <= 1.0) {
            if (jj > 0) {
              intp = (1.0-tt)*volFrac[jj-1]+tt*volFrac[jj];
            } else {
              intp = tt*volFrac[jj];
            }
            break;
          }
        }
        meanSizeCalc.push_back(mean);
        meanVolFracCalc.push_back(intp/100.0);
      }
    }

    // Convert the volume fraction into a number
    // Assume that the total volume is a large value
    // Formula is
    // n_i = vf_i * V / d_1^2  - 2D
    // n_i = vf_i * V / d_1^3  - 3D
    std::vector<Balls> ballDist;
    double totalVol = 1000.0*maxParticleSize;
    double totVol2D = 0.0; double totVol3D = 0.0;
    if (numSizes > 0) {
      for (size_t ii = 0; ii < meanSizeCalc.size(); ++ii) {
        double vf = meanVolFracCalc[ii];
        double dia = meanSizeCalc[ii];
        int num2D = static_cast<int>(std::ceil(vf*totalVol/(dia*dia)));
        int num3D = static_cast<int>(std::ceil(vf*totalVol/(dia*dia*dia)));
        double vol2D = dia*dia*static_cast<double>(num2D);
        double vol3D = dia*dia*dia*static_cast<double>(num3D);
        totVol2D += vol2D;
        totVol3D += vol3D;
        ballDist.push_back({num2D, num3D, dia, vol2D, vol3D});
      }
    }
    numSizesCalc = ballDist.size();

    // Copy the rest of the data into d_PartSizeDist
    std::cout << "Composite" << "\n";
    std::cout << "Size " 
              << "... Number (2D) .. Vol.Frac (2D)" 
              << "... Number (3D) .. Vol.Frac (3D)" << "\n";
    int totBalls2D = 0;
    int totBalls3D = 0;
    for (auto& ball : ballDist) {
      sizeCalc.push_back(ball.ballDia);
      freq2DCalc.push_back(ball.numBalls2D);
      freq3DCalc.push_back(ball.numBalls3D);
      volFrac2DCalc.push_back(100.0*ball.vol2D/totVol2D);
      volFrac3DCalc.push_back(100.0*ball.vol3D/totVol3D);
      totBalls2D += ball.numBalls2D;
      totBalls3D += ball.numBalls3D;
      std::cout << ball.ballDia  << "    "
                << ball.numBalls2D << "     "
                << volFrac2DCalc.back() << +"      "
                << ball.numBalls3D << "     "
                << volFrac3DCalc.back() << "\n";
    }
    std::cout << " Total:  2D = " << totBalls2D <<  " 3D = " << totBalls3D << "\n";
  }
};

} // end namespace VaangoUI

#endif //__Vaango_UI_PARTICLE_SIZE_DIST_H__