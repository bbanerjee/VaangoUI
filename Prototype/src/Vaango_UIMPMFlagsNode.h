#ifndef __Vaango_UI_MPM_FLAGS_NODE_H__
#define __Vaango_UI_MPM_FLAGS_NODE_H__

#include <Vaango_UIData.h>
#include <Vaango_UIUtils.h>

#include <imgui.h>
#include <imnodes.h>
#include <json.hpp>

#include <iostream>
#include <fstream>
#include <filesystem>

using json = nlohmann::json;

namespace VaangoUI {

class Vaango_UIMPMFlagsNode
{
private:

  bool d_show = false;

public:

  Vaango_UIMPMFlagsNode() = default;

  ~Vaango_UIMPMFlagsNode() = default;

public:

  void draw(int id)
  {
    ImNodes::BeginNode(id);

    ImNodes::BeginNodeTitleBar();
    ImGui::Text("MPM settings");
    ImNodes::EndNodeTitleBar();

    ImGui::PushItemWidth(100);

    const char* dimen[] = {"Plane stress", "Plane stress", "Axisymmetric", "3D"};
    static int dim = 3;
    ImGui::Combo("Problem type", &dim, dimen, IM_ARRAYSIZE(dimen));
    s_mpmFlags.simulationDim = static_cast<Dimensionality>(dim);

    const char* interpolation[] = {"Linear", "GIMP", "CPDI", "CPTI"};
    static int type = 0;
    ImGui::Combo("Interpolation type", &type, interpolation,
                 IM_ARRAYSIZE(interpolation));
    s_mpmFlags.interpolatorType = static_cast<MPMInterpolation>(type);
    if (s_mpmFlags.interpolatorType == MPMInterpolation::CPDI) {
      ImGui::InputFloat("Critical length", &s_mpmFlags.cpdiLcrit, 0.0f, 0.0f, "%.3f"); 
    }

    const char* defgrad[] = {"First order", "Subcycling", "Taylor series"};
    static int def = 2;
    ImGui::Combo("Deformation gradient algorithm", &def, defgrad,
                 IM_ARRAYSIZE(defgrad));
    s_mpmFlags.defGradAlgorithm = static_cast<DeformationGradient>(def);
    if (s_mpmFlags.defGradAlgorithm == DeformationGradient::TAYLOR_SERIES) {
      ImGui::InputInt("Number of series terms", &s_mpmFlags.numTermsSeriesDefGrad); 
    }

    ImGui::PopItemWidth();

    ImNodes::BeginOutputAttribute(id+1);
    ImGui::Indent(200);
    ImGui::Text("Integration");
    ImGui::Unindent();
    ImNodes::EndOutputAttribute();

    ImNodes::EndNode();
  }

  void saveToJSON(bool& save) const {
  }

  void saveToXML(bool& save) const {
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_MPM_FLAGS_NODE_H__