#include <Core/ParticleInRVE.h>

#include <Utils/tinyxml2.h>

#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/xml_parser.hpp>
#include <boost/property_tree/json_parser.hpp>

#include <gtest/gtest.h>

#include <iostream>
#include <string>

using namespace VaangoUI;

static std::string
indent(int level)
{
  std::string s;
  for (int i = 0; i < level; i++)
    s += "  ";
  return s;
}

static void
printTree(boost::property_tree::ptree& pt, int level)
{
  if (pt.empty()) {
    std::cout << "\"" << pt.data() << "\"";
  }

  else {
    if (level)
      std::cout << std::endl;

    std::cout << indent(level) << "{" << std::endl;

    for (boost::property_tree::ptree::iterator pos = pt.begin();
         pos != pt.end();) {
      std::cout << indent(level + 1) << "\"" << pos->first << "\": ";

      printTree(pos->second, level + 1);
      ++pos;
      if (pos != pt.end()) {
        std::cout << ",";
      }
      std::cout << std::endl;
    }

    std::cout << indent(level) << " }";
  }
  std::cout << std::endl;
  return;
}

int main(int argc, char** argv, char* env[]) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}

TEST(Test_ParticleInRVE, createXML) {
  using namespace tinyxml2;

  XMLDocument doc;
  XMLElement* all = doc.NewElement("union");
  doc.InsertEndChild(all);
  XMLElement* sphere = doc.NewElement("sphere");
  sphere->SetAttribute("label", "First node");
  all->InsertFirstChild(sphere);
  XMLElement* origin = doc.NewElement("origin");
  origin->InsertFirstChild(doc.NewText("[0.022, 0.028, 0.1]"));
  XMLElement* radius = doc.NewElement("radius");
  radius->InsertFirstChild(doc.NewText("0.01"));
  XMLElement* thickness = doc.NewElement("thickness");
  thickness->InsertFirstChild(doc.NewText("0.01"));
  sphere->InsertFirstChild(origin);
  sphere->InsertAfterChild(origin, thickness);
  sphere->InsertEndChild(radius);
  //doc.Print();
  
  XMLPrinter printer;
  doc.Print(&printer);
  //std::cout << printer.CStr() << "\n";
  //std::cout << doc.ErrorID() << "\n";

  /*
  XMLDocument doc;
	XMLElement* element1 = doc.NewElement("Element1");
	XMLElement* element2 = doc.NewElement("Element2");
	doc.InsertEndChild(element1);
	doc.InsertEndChild(element2);
	doc.InsertAfterChild(element2, element2);
	doc.InsertAfterChild(element2, element2);
  */
}

TEST(Test_ParticleInRVE, xmltojson) {

  static const std::string xml_str = 
  "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
  "<union>"
  "  <sphere label = \"First node\">"
  "    <origin> [0.022, 0.028, 0.1]</origin>"
  "    <radius> 0.01 </radius>"
  "  </sphere>"
  "  <sphere label = \"2nd node\">"
  "    <origin> [0.030, 0.075, 0.1]</origin>"
  "    <radius> 0.01 </radius>"
  "  </sphere>"
  "</union>";

  try {
    boost::property_tree::ptree pt;
    std::istringstream ss(xml_str);
    boost::property_tree::read_xml(ss, pt);
    //printTree(pt, 4);
    std::ostringstream out;
    boost::property_tree::write_json(out, pt);
    //std::cout << out.str() << std::endl;
  }
  catch (std::exception &e) {
    std::cerr << e.what() << std::endl;
  }
}

TEST(Test_ParticleInRVE, jsontoxml) {

  static const std::string json_str = 
  "{\"union\" : ["
  "   {\"sphere\" : {"
  "       \"origin\" : \"[0.022, 0.028, 0.1]\","
  "       \"radius\" : 0.01"
  "   }},"
  "   {\"sphere\" : {"
  "       \"origin\" : \"[0.03, 0.05, 0.1]\","
  "       \"radius\" : 0.02"
  "   }}"
  "]}";

  try {
    using boost::property_tree::ptree;
    ptree pt;
    std::istringstream ss(json_str);
    read_json(ss, pt);
    //printTree(pt, 4);
    std::ostringstream out;
    write_xml(out, pt, 
              boost::property_tree::xml_writer_settings<ptree::key_type>('\t', 1));
    //std::cout << out.str() << std::endl;
  }
  catch (std::exception &e) {
    std::cerr << e.what() << std::endl;
  }
}
