#ifndef __Vaango_UI_NODES_COMPONENT_H__
#define __Vaango_UI_NODES_COMPONENT_H__

#include <Vaango_UIComponentBase.h>
#include <Vaango_UIPhysicalConstantsNode.h>
#include <Vaango_UIOutputInformationNode.h>
#include <Vaango_UITimeIntegrationNode.h>
#include <Vaango_UIMPMFlagsNode.h>

#include <imgui.h>
#include <imnodes.h>

namespace VaangoUI {


class Vaango_UINodesComponent final : public Vaango_UIComponentBase
{
private:

   bool d_showGeometryNode = false;
   bool d_showPhysicalConstantsNode = false;
   bool d_showOutputNode = false;
   bool d_showTimeIntegrationNode = false;
   bool d_showMPMFlagsNode = false;

   Vaango_UIPhysicalConstantsNode d_physicalConstantsNode;
   Vaango_UIOutputInformationNode d_outputNode;
   Vaango_UITimeIntegrationNode d_integrationNode;
   Vaango_UIMPMFlagsNode d_mpmNode;

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
          d_showTimeIntegrationNode = true;
        }

        if (ImGui::BeginMenu("Simulation component")) {
          if (ImGui::MenuItem("MPM")) {
            d_showMPMFlagsNode = true;
          }
          ImGui::MenuItem("ICE");
          ImGui::MenuItem("MPMICE");
          ImGui::EndMenu();
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

      int node_id = 0;
      if (d_showPhysicalConstantsNode) {
        node_id++;
        d_physicalConstantsNode.draw(node_id);
      }

      if (d_showTimeIntegrationNode) {
        node_id++;
        d_integrationNode.draw(node_id);
      }

      if (d_showMPMFlagsNode) {
        node_id++;
        d_mpmNode.draw(node_id);
      }

      if (d_showOutputNode) {
        node_id++;
        d_outputNode.draw(node_id);
      }

      if (d_showGeometryNode) {
        node_id++;
          ImNodes::BeginNode(node_id);

          ImNodes::BeginNodeTitleBar();
          ImGui::Text("Geometry");
          ImNodes::EndNodeTitleBar();

          ImNodes::BeginInputAttribute(node_id+1);
          ImGui::Text("Input");
          ImNodes::EndInputAttribute();

          ImNodes::BeginOutputAttribute(node_id+2);
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