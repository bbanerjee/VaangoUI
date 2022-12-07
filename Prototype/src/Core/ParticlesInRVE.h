#ifndef __Vaango_PARTICLES_IN_RVE_H__
#define __Vaango_PARTICLES_IN_RVE_H__

#include <Core/Enums.h>
#include <Core/ParticleSizeDist.h>
#include <Core/ParticleInRVE.h>
#include <Core/Point.h>

#include <json.hpp>
#include <Utils/tinyxml2.h>

#include <iostream>
#include <map>
#include <memory>
#include <string>
#include <vector>

using json = nlohmann::json;

namespace VaangoUI {

//**************************************************************************
// Class   : ParticlesInRVE
// Purpose : Creates a ParticleInRVE list
//**************************************************************************
class ParticlesInRVE {

private:

  double d_rveSize = 0.0;
  std::map<double, std::vector<ParticleInRVE>> d_particleList;

public:

  ParticlesInRVE() 
    : d_rveSize(100.0) {}

  // Save the particle data to file
  void saveToFile(const std::string& filename,
                  const FileFormat& format) 
  {
    switch(format) 
    {
      case FileFormat::JSON:
      {
        json data = saveToJSON();
        std::ofstream f(filename, std::ios::out);
        f << std::setw(4) << data << "\n";
        f.close();
        break;
      }
      case FileFormat::XML:
      {
        std::string data = saveToXML();
        std::ofstream f(filename, std::ios::out);
        f << std::setw(4) << data << "\n";
        f.close();
        break;
      }
      default:
        break;
    };
  }

  // Save the particle data to JSON file
  json saveToJSON()
  {
    json data = {
      {"rve_size", d_rveSize},
      {"num_objects", getNumParticles()}
    };
    for (const auto& [radius, particles] : d_particleList) {
      for (const auto& part : particles) {
        json partData = part.saveToJSON();
        data["union"] += partData;
      }
    }
    //std::cout << data << "\n";
    return data;
  }

  // Save the particle data to JSON file
  std::string saveToXML()
  {
    tinyxml2::XMLDocument doc;
    auto rveSize = doc.NewElement("rve_size");
    rveSize->InsertFirstChild(doc.NewText(std::to_string(d_rveSize).c_str()));
    auto numObjects = doc.NewElement("num_objects");
    numObjects->InsertFirstChild(doc.NewText(std::to_string(getNumParticles()).c_str()));
    doc.InsertFirstChild(rveSize);
    doc.InsertAfterChild(rveSize, numObjects);
    auto all = doc.NewElement("union");
    bool first = true;
    tinyxml2::XMLElement* previous;
    for (const auto& [radius, particles] : d_particleList) {
      for (const auto& part : particles) {
        auto partChild = part.saveToXML(doc);
        if (first) {
          all->InsertFirstChild(partChild);
          first = false;
        } else {
          all->InsertAfterChild(previous, partChild);
        }
        previous = partChild;
      }
    }
    doc.InsertEndChild(all);

    tinyxml2::XMLPrinter printer;
    doc.Print(&printer);
    return printer.CStr();
  }

  /*
  // Create a Particle list based on a vector of coordinates of interfaces
  ParticlesInRVE(File particleFile) {
    d_particleList = new Vector<Particle>();
    readFromFile(particleFile);
    d_triangleList = new Vector<PolygonDouble>();
    d_voronoiList = new Vector<Point>();
  }
  */

  /*
  // Read the particle data from file (for the new format - circles, squares,
  // spheres, cubes
  public void readFromFile(File particleFile) {
    d_particleList.clear();
    d_triangleList.clear();
    d_voronoiList.clear();
    
    try {
      DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
      DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
      Document doc = dBuilder.parse(particleFile);
      doc.getDocumentElement().normalize();
      
      std::cout << "Root element :" + doc.getDocumentElement().getNodeName());

      std::cout << "Reading RVE size " + "----------------------------");
      NodeList rveNode = doc.getElementsByTagName("RVE_size");
      if (rveNode.getLength() > 0) {
        String text = rveNode.item(0).getTextContent();
        std::cout << "RVE size : " + text);
        d_rveSize = Double.parseDouble(text);
      }

      std::cout << "Reading cylinders " + "----------------------------");
      NodeList cylinderNodeList = doc.getElementsByTagName("cylinder");
      for (int temp = 0; temp < cylinderNodeList.getLength(); temp++) {
     
        Node nNode = cylinderNodeList.item(temp);
        std::cout << "\nCurrent Element :" + nNode.getNodeName());
        if (nNode.getNodeType() == Node.ELEMENT_NODE) {
     
          Element eElement = (Element) nNode;
          
          // Variables to read the data into
          Point top = new Point();
          Point bottom = new Point();
          double radius = 0.0;
          double thickness = 0.0;
          String text = null;

          // Read the bottom
          NodeList localNodeList = eElement.getElementsByTagName("bottom");
          if (localNodeList.getLength() > 0) {
            text = localNodeList.item(0).getTextContent();
            std::cout << "Bottom : " + text);
          } 
          if (text != null) {
            text = text.replace("[", " ");
            text = text.replace("]", " ");
            String[] parts = text.split(",");
            double xx = Double.parseDouble(parts[0]);
            double yy = Double.parseDouble(parts[1]);
            double zz = Double.parseDouble(parts[2]);
            top.setX(xx);
            top.setY(yy);
            top.setZ(zz);
            std::cout << "Bottom : " + xx +" "+yy+" "+zz);
          }

          // Read the top
          localNodeList = eElement.getElementsByTagName("top");
          if (localNodeList.getLength() > 0) {
            text = localNodeList.item(0).getTextContent();
            std::cout << "Top : " + text);
          } 
          if (text != null) {
            text = text.replace("[", " ");
            text = text.replace("]", " ");
            String[] parts = text.split(",");
            double xx = Double.parseDouble(parts[0]);
            double yy = Double.parseDouble(parts[1]);
            double zz = Double.parseDouble(parts[2]);
            bottom.setX(xx);
            bottom.setY(yy);
            bottom.setZ(zz);
            std::cout << "Top : " + xx +" "+yy+" "+zz);
          }

          // Read the radius
          localNodeList = eElement.getElementsByTagName("radius");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             std::cout << "Radius : " + text);
             radius = Double.parseDouble(text);
          }

          // Read the thickness
          localNodeList = eElement.getElementsByTagName("thickness");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             std::cout << "Thickness : " + text);
             thickness = Double.parseDouble(text);
          }
          Particle particle = new Particle(Particle.CIRCLE, radius, 0.0, thickness, 
                                           bottom, 1);
          this.addParticle(particle);
        }
      }
   
      std::cout << "Reading spheres " + "----------------------------");
      NodeList sphereNodeList = doc.getElementsByTagName("sphere");
      for (int temp = 0; temp < sphereNodeList.getLength(); temp++) {
        Node nNode = sphereNodeList.item(temp);
        std::cout << "\nCurrent Element :" + nNode.getNodeName());
        if (nNode.getNodeType() == Node.ELEMENT_NODE) {
          Element eElement = (Element) nNode;
          
          // Variables to read the data into
          Point center = new Point();
          double radius = 0.0;
          double thickness = 0.0;

          // Read the center
          String text = null;
          NodeList localNodeList = eElement.getElementsByTagName("center");
          if (localNodeList.getLength() > 0) {
            text = localNodeList.item(0).getTextContent();
            std::cout << "Center : " + text);
          } else {
            localNodeList = eElement.getElementsByTagName("origin");
            if (localNodeList.getLength() > 0) {
              text = localNodeList.item(0).getTextContent();
              std::cout << "Origin : " + text);
            }
          }
          if (text != null) {
            text = text.replace("[", " ");
            text = text.replace("]", " ");
            String[] parts = text.split(",");
            double xx = Double.parseDouble(parts[0]);
            double yy = Double.parseDouble(parts[1]);
            double zz = Double.parseDouble(parts[2]);
            center.setX(xx);
            center.setY(yy);
            center.setZ(zz);
            std::cout << "Center : " + xx +" "+yy+" "+zz);
          }

          // Read the radius
          localNodeList = eElement.getElementsByTagName("radius");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             std::cout << "Radius : " + text);
             radius = Double.parseDouble(text);
          }

          // Read the thickness
          localNodeList = eElement.getElementsByTagName("thickness");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             std::cout << "Thickness : " + text);
             thickness = Double.parseDouble(text);
          }
          Particle particle = new Particle(Particle.SPHERE, radius, 0.0, thickness, 
                                           center, 1);
          this.addParticle(particle);
        }
      }

    } catch (Exception e) {
      std::cout << "Could not read from "+particleFile.getName());
      e.printStackTrace();
    }
  }

  */

  void setRVESize(double rveSize) {d_rveSize = rveSize;}
  double getRVESize() const {return d_rveSize;}
  int size() const {return static_cast<int>(d_particleList.size());}
  int getNumParticles() const {
    int num = 0;
    for (const auto& [radius, particles] : d_particleList) {
      num += particles.size();
    }
    return num;
  }

  void clear() {
    d_particleList.clear();
  }

  const std::vector<double> getRadii() const {
    std::vector<double> radii;
    for (const auto& [radius, particles] : d_particleList) {
      radii.push_back(radius);
    }
    return radii;
  }

  const std::map<double, std::vector<ParticleInRVE>>& getParticles() const {
    return d_particleList;
  }

  const ParticleInRVE& getParticle(double radius, unsigned int index) const {
    try {
      auto& particles = d_particleList.at(radius);
      if (index > particles.size()) {
        return particles.back(); 
      }
      if (index < 0) {
        return particles.front();
      }
      return particles[index];
    } catch(std::out_of_range& err) {
      std::cout << "Error in getParticle: r : " << radius << " index: " << index << std::endl;
      for (const auto& [radius, particles] : d_particleList) {
         std::cout << "r: " << radius << " N: " << particles.size() << std::endl;
      }
      throw;
    }
  }

  void addParticle(const ParticleInRVE& particle) {
    d_particleList[particle.getRadius()].emplace_back(particle);
  }

  bool isEmpty() {
    if (!(d_particleList.size() > 0)) return true;
    return false;
  }

  friend std::ostream& operator<< (std::ostream &out, const ParticlesInRVE& data)
  {
    int ii = 0;
    for (const auto& [radius, particles] : data.d_particleList) {
      for (const auto& part : particles) {
        out << "# Particle " << ii;
        out << "(" << part.getShape() << " "
                   << part.getRadius() << " (" << radius << ") "
                   << part.getThickness() << " "
                   << part.getRotation() << " "
                   << part.getCenter() << " "
                   << part.getMatCode() << ")\n";
      }
      ii++;
    }
    return out;
  } 

};

} // end namespace VaangoUI

#endif //__Vaango_UI_PARTICLES_IN_RVE_H__