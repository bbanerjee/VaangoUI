#ifndef __Vaango_UI_DATA_H__
#define __Vaango_UI_DATA_H__

#include <Core/Enums.h>
#include <Core/ParticleInRVE.h>
#include <Core/Point.h>
#include <Core/Polygon.h>
//#include <Core/Voronoi.h>

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

  void readFromFile(const std::string& filename) {

  }

  void saveToFile(const std::string& filename) {

  }
};

//**************************************************************************
// Class   : ParticlesInRVE
// Purpose : Creates a ParticlesInRVE object
//**************************************************************************
class ParticlesInRVE {

private:

  double d_rveSize = 0.0;
  std::vector<ParticleInRVE>   d_particleList;
  std::vector<Polygon<double>> d_triangleList;
  std::vector<Point>           d_voronoiList;

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

  // Save the particle data to file (for the new format - cylinders and spheres only)
  public void saveToFile(File particleFile, int partType) {
    try {
      
      // Create a filewriter and the associated printwriter
      FileWriter fw = new FileWriter(particleFile);
      PrintWriter pw = new PrintWriter(fw);
      String tab = new String("  ");

      // Write the data
      int nofParts = size();
      pw.println("<?xml version='1.0' encoding='ISO-8859-1' ?>");
      pw.println("<Uintah_Include>");
      pw.println("<!--");
      pw.println("# RVE Size");
      pw.println(d_rveSize);
      pw.println("Number of objects");
      pw.println(nofParts);
      pw.println("Particle type");
      pw.println(partType);
      pw.println("-->");
      pw.println("<RVE_size>");
      pw.println(tab+d_rveSize);
      pw.println("</RVE_size>");
      pw.println("<union>");
      for (int ii = 0; ii < nofParts; ii++) {
        Particle part = getParticle(ii);
        part.print(pw, tab);
      }
      pw.println("</union>");
      pw.println("</Uintah_Include>");
      pw.close();
      fw.close();
    } catch (Exception e) {
      System.out.println("Could not write to "+particleFile.getName());
    }
  }

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
      
      System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

      System.out.println("Reading RVE size " + "----------------------------");
      NodeList rveNode = doc.getElementsByTagName("RVE_size");
      if (rveNode.getLength() > 0) {
        String text = rveNode.item(0).getTextContent();
        System.out.println("RVE size : " + text);
        d_rveSize = Double.parseDouble(text);
      }

      System.out.println("Reading cylinders " + "----------------------------");
      NodeList cylinderNodeList = doc.getElementsByTagName("cylinder");
      for (int temp = 0; temp < cylinderNodeList.getLength(); temp++) {
     
        Node nNode = cylinderNodeList.item(temp);
        System.out.println("\nCurrent Element :" + nNode.getNodeName());
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
            System.out.println("Bottom : " + text);
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
            System.out.println("Bottom : " + xx +" "+yy+" "+zz);
          }

          // Read the top
          localNodeList = eElement.getElementsByTagName("top");
          if (localNodeList.getLength() > 0) {
            text = localNodeList.item(0).getTextContent();
            System.out.println("Top : " + text);
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
            System.out.println("Top : " + xx +" "+yy+" "+zz);
          }

          // Read the radius
          localNodeList = eElement.getElementsByTagName("radius");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             System.out.println("Radius : " + text);
             radius = Double.parseDouble(text);
          }

          // Read the thickness
          localNodeList = eElement.getElementsByTagName("thickness");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             System.out.println("Thickness : " + text);
             thickness = Double.parseDouble(text);
          }
          Particle particle = new Particle(Particle.CIRCLE, radius, 0.0, thickness, 
                                           bottom, 1);
          this.addParticle(particle);
        }
      }
   
      System.out.println("Reading spheres " + "----------------------------");
      NodeList sphereNodeList = doc.getElementsByTagName("sphere");
      for (int temp = 0; temp < sphereNodeList.getLength(); temp++) {
        Node nNode = sphereNodeList.item(temp);
        System.out.println("\nCurrent Element :" + nNode.getNodeName());
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
            System.out.println("Center : " + text);
          } else {
            localNodeList = eElement.getElementsByTagName("origin");
            if (localNodeList.getLength() > 0) {
              text = localNodeList.item(0).getTextContent();
              System.out.println("Origin : " + text);
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
            System.out.println("Center : " + xx +" "+yy+" "+zz);
          }

          // Read the radius
          localNodeList = eElement.getElementsByTagName("radius");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             System.out.println("Radius : " + text);
             radius = Double.parseDouble(text);
          }

          // Read the thickness
          localNodeList = eElement.getElementsByTagName("thickness");
          if (localNodeList.getLength() > 0) {
             text = localNodeList.item(0).getTextContent();
             System.out.println("Thickness : " + text);
             thickness = Double.parseDouble(text);
          }
          Particle particle = new Particle(Particle.SPHERE, radius, 0.0, thickness, 
                                           center, 1);
          this.addParticle(particle);
        }
      }

    } catch (Exception e) {
      System.out.println("Could not read from "+particleFile.getName());
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
      pw.println("# RVE Size");
      pw.println(d_rveSize);
      pw.println("Number of objects");
      pw.println(nofParts);
      pw.println("# Particle List");
      pw.println("# type  radius  thickness rotation  xCent  yCent  zCent  matCode");
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
        pw.println("# Particle "+ii);
        pw.println(partType+" "+
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
      System.out.println("Could not write to "+particleFile.getName());
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
            System.out.println(type+" "+radius+" "+thickness+" "+
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
      System.out.println("Could not read from "+particleFile.getName());
    }
  }
  */

  void setRVESize(double rveSize) {d_rveSize = rveSize;}
  double getRVESize() const {return d_rveSize;}
  int size() const {return static_cast<int>(d_particleList.size());}

  const ParticleInRVE& getParticle(int index) const {
    if (index > d_particleList.size()) {
      return d_particleList.back(); 
    }
    if (index < 0) {
      return d_particleList.front();
    }
    return d_particleList[index];
  }

  void addParticle(const ParticleInRVE particle) {
    d_particleList.push_back(particle);
  }

  bool isEmpty() {
    if (!(d_particleList.size() > 0)) return true;
    return false;
  }

  void clear() {
    if (!isEmpty()) {
      d_particleList.clear();
      d_triangleList.clear();
      d_voronoiList.clear();
    }
  }

  /**
   * Triangulate the particle list
   */
  void triangulate() {
    //Voronoi vor = new Voronoi(this);
    //vor.process();
  }

  /**
   *  Add a triangle to the triangle list
   */
  void addTriangle(const Polygon<double>&  p) {
    d_triangleList.push_back(p);
  }

  /**
   *  Get the triangle list
   */
  std::vector<Polygon<double>> getTriangles() {
    return d_triangleList;
  }

  /**
   *  Add a point to the voronoi vertex list
   */
  void addVoronoiVertex(const Point& p) {
    d_voronoiList.push_back(p);
  }

  /**
   *  Get the voronoi vertex list
   */
  std::vector<Point> getVoronoiVertices() {
    return d_voronoiList;
  }
};

static ParticleSizeDist s_sizeDist;

} // namespace VaangoUI

#endif //__Vaango_UI_DATA_H__