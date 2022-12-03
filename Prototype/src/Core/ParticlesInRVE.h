#ifndef __Vaango_PARTICLES_IN_RVE_H__
#define __Vaango_PARTICLES_IN_RVE_H__

#include <Core/Enums.h>
#include <Core/ParticleSizeDist.h>
#include <Core/ParticleInRVE.h>
#include <Core/Point.h>

#include <json.hpp>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/xml_parser.hpp>
#include <boost/property_tree/json_parser.hpp>

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

  /*
  // Create a Particle list based on a vector of coordinates of interfaces
  ParticlesInRVE(File particleFile) {
    d_particleList = new Vector<Particle>();
    readFromFile(particleFile);
    d_triangleList = new Vector<PolygonDouble>();
    d_voronoiList = new Vector<Point>();
  }
  */

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
      {"num_objects", d_particleList.size()}
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
    json data = saveToJSON();

    std::ostringstream out;
    try {
      boost::property_tree::ptree tree;
      std::istringstream in(data.dump());
      boost::property_tree::read_json(in, tree);
      boost::property_tree::write_xml(out, tree);
      //std::cout << out.str() << "\n";
    } catch (std::exception& e) {
      std::cerr << __FUNCTION__ << ":" << e.what() << std::endl;
    }
    return out.str();
  }

  /*
      String tab = new String("  ");

      // Write the data
      int nofParts = size();
      std::cout << "<?xml version='1.0' encoding='ISO-8859-1' ?>");
      std::cout << "<Uintah_Include>");
      std::cout << "<!--");
      std::cout << "# RVE Size");
      std::cout << d_rveSize);
      std::cout << "Number of objects");
      std::cout << nofParts);
      std::cout << "Particle type");
      std::cout << partType);
      std::cout << "-->");
      std::cout << "<RVE_size>");
      std::cout << tab+d_rveSize);
      std::cout << "</RVE_size>");
      std::cout << "<union>");
      for (int ii = 0; ii < nofParts; ii++) {
        Particle part = getParticle(ii);
        part.print(pw, tab);
      }
      std::cout << "</union>");
      std::cout << "</Uintah_Include>");
      pw.close();
      fw.close();
    } catch (Exception e) {
      std::cout << "Could not write to "+particleFile.getName());
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

  // Save the particle data to file (for the old format - circles, squares,
  // spheres, cubes)
  public void saveToFileOldFormat(File particleFile, int partType) {
    try {
      
      // Create a filewriter and the associated printwriter
      FileWriter fw = new FileWriter(particleFile);
      PrintWriter pw = new PrintWriter(fw);

      // Write the data
      int nofParts = size();
      std::cout << "# RVE Size");
      std::cout << d_rveSize);
      std::cout << "Number of objects");
      std::cout << nofParts);
      std::cout << "# Particle List");
      std::cout << "# type  radius  thickness rotation  xCent  yCent  zCent  matCode");
      DecimalFormat df = new DecimalFormat("####0.0######");
      for (int ii = 0; ii < nofParts; ii++) {
        Particle part = getParticle(ii);
        double radius = part.getRadius();
        double thickness = part.getThickness();
        double rotation = part.getRotation();
        double xCent = part.getCenter().getX();
        double yCent = part.getCenter().getY();
        double zCent = part.getCenter().getZ();
        int matCode = part.getMatCode();
        std::cout << "# Particle "+ii);
        std::cout << partType+" "+
                   df.format(radius)+" "+
                   df.format(thickness)+" "+
                   df.format(rotation)+" "+
                   df.format(xCent)+" "+
                   df.format(yCent)+" "+
                   df.format(zCent)+" "+matCode);
      }

      pw.close();
      fw.close();
    } catch (Exception e) {
      std::cout << "Could not write to "+particleFile.getName());
    }
  }

  // Read the particle data from file (for the old format - circles, squares,
  // spheres, cubes
  public void readFromFileOldFormat(File particleFile) {
    d_particleList.clear();
    d_triangleList.clear();
    d_voronoiList.clear();
    try {
      FileReader fr = new FileReader(particleFile);
      StreamTokenizer st = new StreamTokenizer(fr);
      st.commentChar('#');
      st.parseNumbers();
      st.eolIsSignificant(true);
      boolean first = true;
      int count = 0;
      int type = Particle.CIRCLE;
      double radius = 0.0;
      double rotation = 0.0;
      double thickness = 0.0;
      double xx = 0.0;
      double yy = 0.0;
      double zz = 0.0;
      int matCode = 0;
      int ttval = 0;
      while((ttval = st.nextToken()) != StreamTokenizer.TT_EOF) {
        if (first) {
          if (ttval == StreamTokenizer.TT_NUMBER) {
            d_rveSize = st.nval;
            first = false;
          }
        } else {
          if (ttval == StreamTokenizer.TT_NUMBER) {
            ++count;
            double ii = st.nval;
            switch (count) {
              case 1: type = (int) ii; break;
              case 2: radius = ii; break;
              case 3: thickness = ii; break;
              case 4: rotation = ii; break;
              case 5: xx = ii; break;
              case 6: yy = ii; break;
              case 7: zz = ii; break;
              case 8: matCode = (int) ii; break;
              default: break;
            }
          }
          if (ttval == StreamTokenizer.TT_EOL && count != 0) {
            std::cout << type+" "+radius+" "+thickness+" "+
                                 rotation+" "+xx+" "+yy+" "+zz+" "+matCode);
            Point center = new Point(xx, yy, zz);
            Particle particle = new Particle(type, radius, rotation, thickness, 
                                             center, matCode);
            this.addParticle(particle);
            count = 0;
          }
        }
      }
    } catch (Exception e) {
      std::cout << "Could not read from "+particleFile.getName());
    }
  }
  */

  void setRVESize(double rveSize) {d_rveSize = rveSize;}
  double getRVESize() const {return d_rveSize;}
  int size() const {return static_cast<int>(d_particleList.size());}

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