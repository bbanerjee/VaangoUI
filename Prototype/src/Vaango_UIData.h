#ifndef __Vaango_UI_DATA_H__
#define __Vaango_UI_DATA_H__

#include <Core/Enums.h>
#include <Core/ParticleSizeDist.h>
#include <Core/ParticlesInRVE.h>

#include <string>
#include <vector>

namespace VaangoUI {

struct PhysicalConstants 
{
  float refPressure = 101325.0f;
  float gravity[3] = {0.0f, 0.0f, 9.81f};
};

struct OutputInformation
{
  std::string outputUDAFile = "test.uda";
  float timeInterval = 1.0e-6;
  int timestepInterval = 10;
  int checkpointCycle = 2;
  float checkpointTimeInterval = 5*timeInterval;
  int checkpointTimestepInterval = 5*timestepInterval;
  std::vector<std::string> outputVariables;
};

struct Integration
{
  IntegrationType integrationType;
  float startTime = 0.0;
  float endTime = 100.0;
  int maxTimesteps = 99999;
  float initialTimestep = 1.0e-6;
  float minTimestep = 1.0e-6;
  float maxTimestep = 1.0;
  float maxIncreaseFactor = 2.0;
  float multiplier = 0.5;
};

extern ParticleShape s_partShapeFlag;
extern ParticleSizeDist s_sizeDist;
extern ParticlesInRVE s_partList;

extern PhysicalConstants s_physicalConstants;
extern OutputInformation s_output;
extern Integration s_integration;

} // namespace VaangoUI

#endif //__Vaango_UI_DATA_H__