#ifndef __Vaango_UI_ENGINEERING_VIEWS_COMPONENT_H__
#define __Vaango_UI_ENGINEERING_VIEWS_COMPONENT_H__

#include <Vaango_UIComponentBase.h>

#include <imgui.h>

#include <map>
#include <string>
#include <iostream>

namespace VaangoUI {

class Vaango_UIEngineeringViewsComponent final : public Vaango_UIComponentBase
{
public:
  Vaango_UIEngineeringViewsComponent(const std::string& title, int width,
                                     int height)
    : Vaango_UIComponentBase(title, width, height)
  {
  }

  ~Vaango_UIEngineeringViewsComponent() {}

  // Virtual constuctor (default constructor used)
  Vaango_UIEngineeringViewsComponent* create(const std::string& title,
                                             int width,
                                             int height) const override
  {
    return new Vaango_UIEngineeringViewsComponent(title, width, height);
  }

  // Virtual constuctor (copy constructor used)
  Vaango_UIEngineeringViewsComponent* clone() const override
  {
    return new Vaango_UIEngineeringViewsComponent(*this);
  }

public:

  void loadIconTextures(const std::string& iconFolder) {

    std::vector<std::string> iconFileNames = {"FrontView"};
    for (const auto fileName : iconFileNames) {
      std::string iconPath = iconFolder + "/" + fileName + ".png";
      Vaango_UIIcon icon = creatIconTextureFromImageFile(iconPath);
      d_icons[fileName] = icon;
    }
  }

  void draw() override
  {
    if (ImGui::Begin(d_title.c_str(), nullptr, ImGuiWindowFlags_NoScrollbar | ImGuiWindowFlags_NoScrollWithMouse)) {

      ImGui::Columns(2, "", false);
      ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(0.5f, 0.5f, 0.5f, 1.0f));

      ImVec2 buttonSize(32, 32);
      auto columnWidth = ImGui::GetWindowContentRegionWidth() - ImGui::GetStyle().FramePadding.x
                         - buttonSize.x - 10;
      ImGui::SetColumnOffset(1, columnWidth);

      ImGui::Spacing();
      ImGui::SameLine();

      unsigned int textureID = d_icons["FrontView"].id;
      if (ImGui::ImageButton(reinterpret_cast<ImTextureID>(textureID), buttonSize, ImVec2(0, 0), ImVec2(1, 1), 2)) {
        std::cout << "Button started" << std::endl;
      }
      if (ImGui::IsItemHovered()) {
        ImGui::SetTooltip("Front view");
      }

      ImGui::PopStyleColor();
      ImGui::Columns(1);
      
      ImGui::End();
    }
  }

public:

  std::map<std::string, Vaango_UIIcon> d_icons;

};

} // namespace VaangoUI

#endif //__Vaango_UI_ENGINEERING_VIEWS_COMPONENT_H__