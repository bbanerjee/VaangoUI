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

struct MPMFlags
{
  Dimensionality simulationDim = Dimensionality::THREE_D; // Use axisymmetric?

  // General flags
  bool withICE = false;                    // For MPMICE coupling
  bool useCoordRotation = false;           // Coordinate rotation on/off
  bool doPressureStabilization = false;    //
  bool fracture = false;                   // to turn on fracture
  bool useCohesiveZones = false;           // Flag for using cohesive zones
  bool withColor = false;                  // to turn on the color variable
  bool computeScaleFactor = false;         // compute the scale factor for viz
  bool doGridReset = false;                // Default is true, standard MPM
  float minMassForAcceleration = 3.0e-15;  // Minimum mass to allow division by in
                                           // computing acceleration

  // Interpolation
  MPMInterpolation interpolatorType = MPMInterpolation::GIMP;
  int nodes8or27 = 27;             // Number of nodes a particle can interact with
  bool useCPTI = false;            // Flag for using CPTI interpolation
  float cpdiLcrit = 1.0e10;        // for cpdi interpolator maximum fractional
                                   // cell size for a particle

  // Defromation gradient
  DeformationGradient defGradAlgorithm = DeformationGradient::TAYLOR_SERIES;    // Deformation gradient algorithm
  int numTermsSeriesDefGrad = 5;    // Number of terms in series expansion
                                    // for deformation gradient calculation

  // Boundary conditions
  bool useLoadCurves = false;        // Flag for using load curves
  float forceIncrementFactor = 1.0f; //
  bool useCBDI = false;              // Flag for using CBDI boundary condition treatment

  // Damping
  bool artificialViscosity = false;        // Turn artificial viscosity on/off
  bool artificialViscosityHeating = false; // Include heating due to AV
  float artificialDampCoeff = 0.0f;        //
  float artificialViscCoeff1 = 0.2f;       // Artificial viscosity coefficient 1
  float artificialViscCoeff2 = 2.0f;       // Artificial viscosity coefficient 2

  // Particle deletion
  bool doErosion = false;                  // Flag to decide whether to erode or not
  ErosionAlgorithm erosionAlgorithm = ErosionAlgorithm::NONE;    // Algorithm to erode material points
  bool createNewParticles = false;         // Flag to decide whether to create
                                           // new particles after failure
  bool deleteRogueParticles = true;        // Flag to delete rogue particles
  float maxVel = 3.0e37f;                  // Maxmimum particle velocity before  deletion
  float minPartMass = 3.0e-15f;            // Minimum particle mass before deletion

  // Contact
  bool doContactFriction = false;          //
  bool computeCollinearNormals = false;    //
  float addFrictionWork = 0.0f;            // 1 == add , 0 == do not add

  // Adding materials and particles
  bool canAddMPMMaterial = false;          //
  bool addNewMaterial = false;             // Flag to decide whether to create
  bool insertParticles = false;            // Activate particles according to color
  std::string insertParticlesFile = "dummy.part"; // File containing activation plan

  // Prescribed deformation
  bool prescribeDeformation = false;       // Prescribe deformation via a table of U and R
  bool exactDeformation = false;           // Set steps exactly to match times in prescribed
                                           // deformation file
  std::string prescribedDeformationFile = "dummy.pres"; //

  // AMR
  bool AMR = false;                        // Do AMR?
  bool GEVelProj = false;                  // Flag for adaptive mesh refinement
  bool refineParticles = false;            // Flag for refinement
  int minGridLevel = 0;                    // Only do MPM on this grid level
  int maxGridLevel = 1000;                 // Only do MPM on this grid level

  // For rotating coordinate system
  bool initializeStressFromBodyForce = false; // Flag for using body force to
                                              // initialize stress
  float coordRotationSpeed = 0.0f;               // Speed of rotation
  float coordRotationCenter[3] = {0.0f, 0.0f, 0.0f};       // Center of rotation
  float coordRotationBodyRefPoint[3] = {0.0f, 0.0f, 0.0f}; // Reference point in rotating body
  float coordRotationAxis[3] = {1.0f, 0.0f, 0.0f};         // Axis of rotation

  // For manufactured solutions
  MMSType mmsType = MMSType::NONE;                   // MMS Flag

  // Thermal
  bool computeNodalHeatFlux = false;       // compute the auxilary nodal heat flux
  bool doExplicitHeatConduction = false;   //
  bool doImplicitHeatConduction = false;   //
  bool doTransientImplicitHeatConduction = false; //
  int extraSolverFlushes = 0;          // Have PETSc do more flushes to save memory

  bool doThermalExpansion = false;         // Decide whether to do thermExp or not
  bool doScalarDiffusion = false;          // Flag for scalar diffusion
};

extern ParticleShape s_partShapeFlag;
extern ParticleSizeDist s_sizeDist;
extern ParticlesInRVE s_partList;

extern PhysicalConstants s_physicalConstants;
extern OutputInformation s_output;
extern Integration s_integration;
extern MPMFlags s_mpmFlags;

} // namespace VaangoUI

#endif //__Vaango_UI_DATA_H__