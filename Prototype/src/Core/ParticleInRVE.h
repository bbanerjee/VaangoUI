#ifndef __Vaango_UI_PARTICLE_IN_RVE_H__
#define __Vaango_UI_PARTICLE_IN_RVE_H__

#include <Core/Point.h>
#include <Core/Enums.h>

#include <cmath>
#include <iostream>

namespace VaangoUI {

//**************************************************************************
// Class   : ParticleInRVE
// Purpose : Creates a RVE Particle object
//**************************************************************************

class ParticleInRVE 
{

private:

  ParticleShape d_shape;
  double d_radius;
  double d_length;
  double d_thickness;
  double d_rotation;
  Point d_center;
  int d_matCode;

public:

  ParticleInRVE() 
    : d_shape(ParticleShape::CIRCLE), d_radius(0.0),
      d_length(1.0), d_thickness(0.0), d_rotation(0.0), 
      d_center(0.0,0.0,0.0), d_matCode(0)
  {
  }

  ParticleInRVE(const ParticleShape& shape) 
    : d_shape(shape), d_radius(0.0),
      d_length(1.0), d_thickness(0.0), d_rotation(0.0), 
      d_center(0.0,0.0,0.0), d_matCode(0)
  {
  }

  ParticleInRVE(double radius, double length, Point center, int matCode) 
    : d_shape(ParticleShape::CIRCLE), d_radius(radius),
      d_length(length), d_thickness(0.0), d_rotation(0.0), 
      d_center(center), d_matCode(matCode)
  {
  }

  ParticleInRVE(double radius, double length, double thickness,
               const Point& center, int matCode) 
    : d_shape(ParticleShape::CIRCLE), d_radius(radius),
      d_length(length), d_thickness(thickness), d_rotation(0.0), 
      d_center(center), d_matCode(matCode)
  {
  }

  ParticleInRVE(const ParticleShape&  shape, double radius, 
                double length, double thickness,
                const Point& center, int matCode) 
    : d_shape(shape), d_radius(radius),
      d_length(length), d_thickness(thickness), d_rotation(0.0), 
      d_center(center), d_matCode(matCode)
  {
  }

  ParticleInRVE(const ParticleShape& shape, double radius, 
                double rotation, const Point& center, int matCode) 
    : d_shape(shape), d_radius(radius),
      d_length(1.0), d_thickness(0.0), d_rotation(rotation), 
      d_center(center), d_matCode(matCode)
  {
  }

  ParticleInRVE(const ParticleShape& shape, double radius, 
                double rotation, const Point& center, int matCode, 
                double thickness) 
    : d_shape(shape), d_radius(radius),
      d_length(1.0), d_thickness(thickness), d_rotation(rotation), 
      d_center(center), d_matCode(matCode)
  {
  }

  // Get Particle data
  ParticleShape getShape() const {return d_shape;}
  int getMatCode() const {return d_matCode;}
  double getRadius() const {return d_radius;}
  double getLength() const {return d_length;}
  double getThickness() const {return d_thickness;}
  double getRotation() const {return d_rotation;}
  Point getCenter() const {return d_center;}

  double getVolume() const {
  
    double volume = 0.0;
    switch (d_shape)
    {
      case ParticleShape::CIRCLE: 
      {
        volume = M_PI*d_radius*d_radius; 
        break;
      }
      case ParticleShape::HOLLOW_CIRCLE: 
      {
        double r_in = d_radius - d_thickness;
        volume = M_PI*(d_radius*d_radius - r_in*r_in); 
        break;
      }
      case ParticleShape::SPHERE: 
      {
        volume =  M_PI*d_radius*d_radius*d_radius*(4.0/3.0); 
        break;
      }
      case ParticleShape::HOLLOW_SPHERE: 
      {
        double r_in = d_radius - d_thickness;
        volume =  M_PI*(d_radius*d_radius*d_radius - r_in*r_in*r_in)*(4.0/3.0); 
        break;
      }
      default:
        break;
    }
    return volume;
  }

  // Set Particle data
  void setShape(const ParticleShape& shape) {d_shape = shape;}
  void setMatCode(int matCode) { d_matCode = matCode;}
  void setRadius(double radius) { d_radius = radius;}
  void setLength(double length) { d_length = length;}
  void setThickness(double thickness) { d_thickness = thickness;}
  void setRotation(double rotation) {d_rotation = rotation;}
  void setCenter(const Point& center) { d_center = center;}

  // Print the particle data
  friend std::ostream& operator<< (std::ostream &out, const ParticleInRVE& data) {
    out << "Material Code = " << data.getMatCode()
        << " Shape = " << data.getShape()
        << " Rad = " << data.getRadius() << " Length = " << data.getLength()
        << " Thick = " << data.getThickness()
        << " Rotation = " << data.getRotation() 
        << " Center = " << data.getCenter() ;
    return out;
  }
  
  // Print the particle data to a file
  /*
  public void print(PrintWriter pw, String tab)
  {
    String tab1 = new String(tab+"  ");
    switch (d_shape) 
    {
    case CIRCLE:
      pw.println(tab+"<cylinder label=\""+d_matCode+"\">");
      pw.println(tab1+"<bottom> ["+d_center.getX()+", "+d_center.getY()+", "+
                 d_center.getZ()+"] </bottom>");
      double zcoord = d_center.getZ() + d_length;
      pw.println(tab1+"<top> ["+d_center.getX()+", "+d_center.getY()+", "+
                 zcoord+"] </top>");
      pw.println(tab1+"<radius> "+d_radius+" </radius>");
      pw.println(tab1+"<thickness> "+d_thickness+" </thickness>");
      pw.println(tab+"</cylinder>");
      break;
      
    case SPHERE:
      pw.println(tab+"<sphere label=\""+d_matCode+"\">");
      pw.println(tab1+"<center> ["+d_center.getX()+", "+d_center.getY()+", "+
                 d_center.getZ()+"] </center>");
      pw.println(tab1+"<radius> "+d_radius+" </radius>");
      pw.println(tab1+"<thickness> "+d_thickness+" </thickness>");
      pw.println(tab+"</sphere>");
      break;
      
    default:
      System.out.println("Not output method for particle shape "+d_shape+" implemented yet.");
    }
  }
  */
};

} // end namespace VaangoUI

#endif //__Vaango_UI_PARTICLE_IN_RVE_H__