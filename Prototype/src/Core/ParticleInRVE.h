#ifndef __Vaango_UI_PARTICLE_IN_RVE_H__
#define __Vaango_UI_PARTICLE_IN_RVE_H__

#include <Core/Point.h>
#include <Core/Enums.h>

#include <json.hpp>
#include <Utils/tinyxml2.h>

#include <cassert>
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
  
  // Write the particle data to JSON
  using json = nlohmann::json;
  json saveToJSON() const
  {
    json data; 
    switch (d_shape) 
    {
      case ParticleShape::CIRCLE: 
      case ParticleShape::HOLLOW_CIRCLE: 
        data[std::string("cylinder label=\"" + std::to_string(d_matCode) + "\"")] =
                { 
                 {"bottom", {d_center.x, d_center.y, d_center.z}},
                 {"top", {d_center.x, d_center.y, d_center.z + d_length}},
                 {"radius", d_radius},
                 {"thickness", d_thickness}
                };
        break;
      case ParticleShape::SPHERE: 
      case ParticleShape::HOLLOW_SPHERE: 
        data[std::string("sphere label=\"" + std::to_string(d_matCode) + "\"")] = 
                { 
                 {"center", {d_center.x, d_center.y, d_center.z}},
                 {"radius", d_radius},
                 {"thickness", d_thickness}
                };
        break;
      default:
        break;
    };

    return data;
  }

  // Write the particle data to XML
  tinyxml2::XMLElement* saveToXML(tinyxml2::XMLDocument& doc) const
  {
    switch (d_shape) 
    {
      case ParticleShape::CIRCLE: 
      case ParticleShape::HOLLOW_CIRCLE: 
      {
        auto cylinder = doc.NewElement("cylinder");
        cylinder->SetAttribute("label", std::to_string(d_matCode).c_str());
        auto bottom = doc.NewElement("bottom");
        {
        std::ostringstream data;
        data << d_center;
        bottom->InsertFirstChild(doc.NewText(data.str().c_str()));
        }
        auto top = doc.NewElement("top");
        {
        std::ostringstream data;
        Point topCenter(d_center.x, d_center.y, d_center.z + d_length);
        data << topCenter;
        top->InsertFirstChild(doc.NewText(data.str().c_str()));
        }
        auto radius = doc.NewElement("radius");
        radius->InsertFirstChild(doc.NewText(std::to_string(d_radius).c_str()));
        auto thickness = doc.NewElement("thickness");
        thickness->InsertFirstChild(doc.NewText(std::to_string(d_thickness).c_str()));
        cylinder->InsertFirstChild(bottom);
        cylinder->InsertAfterChild(bottom, top);
        cylinder->InsertAfterChild(top, radius);
        cylinder->InsertEndChild(thickness);
        return cylinder;
      }
        break;
      case ParticleShape::SPHERE: 
      case ParticleShape::HOLLOW_SPHERE: 
      {
        auto sphere = doc.NewElement("sphere");
        sphere->SetAttribute("label", std::to_string(d_matCode).c_str());
        auto center = doc.NewElement("center");
        std::ostringstream data;
        data << d_center;
        center->InsertFirstChild(doc.NewText(data.str().c_str()));
        auto radius = doc.NewElement("radius");
        radius->InsertFirstChild(doc.NewText(std::to_string(d_radius).c_str()));
        auto thickness = doc.NewElement("thickness");
        thickness->InsertFirstChild(doc.NewText(std::to_string(d_thickness).c_str()));
        sphere->InsertFirstChild(center);
        sphere->InsertAfterChild(center, radius);
        sphere->InsertEndChild(thickness);
        return sphere;
      }
        break;
      default:
        break;
    };
    return nullptr;
  }
};

} // end namespace VaangoUI

#endif //__Vaango_UI_PARTICLE_IN_RVE_H__