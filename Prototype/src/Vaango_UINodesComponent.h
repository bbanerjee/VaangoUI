#ifndef __Vaango_UI_NODES_COMPONENT_H__
#define __Vaango_UI_NODES_COMPONENT_H__

#include <Vaango_UIComponentBase.h>
#include <Vaango_UIPhysicalConstantsNode.h>
#include <Vaango_UIOutputInformationNode.h>

#include <imgui.h>
#include <imnodes.h>

namespace VaangoUI {


class Vaango_UINodesComponent final : public Vaango_UIComponentBase
{
private:

   bool d_showGeometryNode = false;
   bool d_showPhysicalConstantsNode = false;
   bool d_showOutputNode = false;

   Vaango_UIPhysicalConstantsNode d_physicalConstantsNode;
   Vaango_UIOutputInformationNode d_outputNode;

public:


  Vaango_UINodesComponent(const std::string& title,
                          int width, int height)
    : Vaango_UIComponentBase(title, width, height)
  {
  }

  ~Vaango_UINodesComponent()
  {
  } 

  // Virtual constuctor (default constructor used)
  Vaango_UINodesComponent* create(const std::string& title,
                                  int width, int height) const override
  {
    return new Vaango_UINodesComponent(title, width, height);
  }

  // Virtual constuctor (copy constructor used)
  Vaango_UINodesComponent* clone() const override
  {
    return new Vaango_UINodesComponent(*this);
  }

public:

  void draw() override
  {
    if (ImGui::Begin(d_title.c_str(), &d_isVisible, 0)) {

      ImNodes::BeginNodeEditor();

      const bool open_popup = ImGui::IsWindowFocused(ImGuiFocusedFlags_RootAndChildWindows) &&
                              ImNodes::IsEditorHovered() &&
                              ImGui::IsMouseReleased(ImGuiMouseButton_Right);

      ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(8.f, 8.f));
      if (!ImGui::IsAnyItemHovered() && open_popup) {
        ImGui::OpenPopup("Add component");
      }
      if (ImGui::BeginPopup("Add component")) {

        if (ImGui::MenuItem("Physical constants")) {
          d_showPhysicalConstantsNode = true;
        }

        if (ImGui::MenuItem("Geometry")) {
          d_showGeometryNode = true;
        }

        if (ImGui::MenuItem("Grid")) {

        }

        if (ImGui::MenuItem("Integration")) {

        }

        if (ImGui::MenuItem("MPM")) {

        }

        if (ImGui::MenuItem("ICE")) {

        }

        if (ImGui::MenuItem("Boundary conditions")) {

        }

        if (ImGui::MenuItem("Material models")) {

        }

        if (ImGui::MenuItem("Output models")) {
          d_showOutputNode = true;
        }

        ImGui::EndPopup();
      }

      if (d_showPhysicalConstantsNode) {
        d_physicalConstantsNode.draw();
      }

      if (d_showOutputNode) {
        d_outputNode.draw();
      }

      if (d_showGeometryNode) {
          ImNodes::BeginNode(1);

          ImNodes::BeginNodeTitleBar();
          ImGui::Text("Geometry");
          ImNodes::EndNodeTitleBar();

          ImNodes::BeginInputAttribute(2);
          ImGui::Text("Input");
          ImNodes::EndInputAttribute();

          ImNodes::BeginOutputAttribute(3);
          ImGui::Text("Output");
          ImNodes::EndInputAttribute();

          ImNodes::EndNode();
      }

      ImGui::PopStyleVar();

      ImNodes::EndNodeEditor();
    }
    ImGui::End();
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_NODES_COMPONENT_H__