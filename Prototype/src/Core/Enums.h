#ifndef __Vaango_UI_ENUMS_H__
#define __Vaango_UI_ENUMS_H__

#include <iostream>
#include <type_traits>

namespace VaangoUI {

  enum class ParticleShape {
    CIRCLE,
    HOLLOW_CIRCLE,
    SPHERE,
    HOLLOW_SPHERE
  };

  enum class FileFormat {
    JSON,
    XML
  };

  enum class Dimensionality {
    PLANE_STRESS,
    PLANE_STRAIN,
    AXISYMMETRIC,
    THREE_D
  };

  enum class IntegrationType {
    EXPLICIT,
    IMPLICIT,
    SYMPLECTIC
  };

  enum class DynamicsType {
    QUASISTATIC,
    DYNAMIC,
    TRANSIENT_DYNAMIC
  };

  enum class ImplicitSolverType {
    SIMPLE_SOLVER,
    PETSC,
    HYPRE
  };

  enum class MPMInterpolation {
    LINEAR,
    GIMP,
    CPDI,
    CPTI
  };

  enum class DeformationGradient {
    FIRST_ORDER,
    SUBCYCLING,
    TAYLOR_SERIES
  };

  enum class ErosionAlgorithm {
    NONE,
    BRITTLE_DAMAGE,
    ALLOW_NO_TENSION,
    ALLOW_NO_SHEAR,
    ZERO_STRESS
  };

  enum class MMSType {
    NONE,
    AXIS_ALIGNED, 
    GENERALIZED_VORTEX, 
    EXPANDING_RING, 
    AXIS_ALIGNED_3L
  };

  enum class ThermalConduction {
    NONE,
    EXPLICIT,
    IMPLICIT,
    TRANSIENT_IMPLICIT
  };

  // Code from: https://stackoverflow.com/questions/11421432/how-can-i-output-the-value-of-an-enum-class-in-c11
  template<typename T>
  std::ostream& operator<<(typename std::enable_if<std::is_enum<T>::value, 
                           std::ostream>::type& stream, const T& e)
  {
    return stream << static_cast<typename std::underlying_type<T>::type>(e);
  }

} // end namespace VaangoUI

#endif //__Vaango_UI_ENUMS_H__
