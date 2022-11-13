#ifndef __Vaango_UI_DATA_H__
#define __Vaango_UI_DATA_H__

#include <string>
#include <iostream>
#include <vector>

namespace VaangoUI {

struct ParticleSizeDist
{
  std::string materialName;
  double particleVolFrac;
  double maxParticleSize;
  double numSizes;
  double numSizesCalc;
  std::vector<double> size;
  std::vector<double> sizeCalc;
  std::vector<double> volFrac;

  ParticleSizeDist() {
    materialName = "default";
    particleVolFrac = 50.0;
    numSizes = 10; 
    numSizesCalc = -1; 
    maxParticleSize = 1000;
    for (int ii = 0; ii < numSizes; ii++) {
      size.push_back(ii/(float)numSizes*maxParticleSize);
      sizeCalc.push_back(-1.0);
      volFrac.push_back(10.0);
    }
  }
};

static ParticleSizeDist s_sizeDist;

} // namespace VaangoUI

#endif //__Vaango_UI_DATA_H__