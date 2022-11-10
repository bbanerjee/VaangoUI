#ifndef __Vaango_UI_INPUT_PART_DIST_PANEL_H__
#define __Vaango_UI_INPUT_PART_DIST_PANEL_H__

#include <Vaango_UIPanelBase.h>
#include <Vaango_UIData.h>

#include <imgui.h>
#include <ImGuiFileDialog.h>
#include <iostream>

namespace VaangoUI {

class Vaango_UIInputPartDistPanel : public Vaango_UIPanelBase
{
private:


public:

  Vaango_UIInputPartDistPanel()
  {
    d_isVisible = false;
  }

  virtual ~Vaango_UIInputPartDistPanel()
  {
  } 

public:

  void draw(const std::string& title, int width, int height)
  {
    {
      ImGui::BeginChild("input part dist", ImVec2(0, 0));
      getInputSizeDist(); 
      ImGui::EndChild();
    }
    ImGui::SameLine();
    {
      ImGui::BeginChild("input part dist", ImVec2(0, 0));
      drawSizeDist(); 
      ImGui::EndChild();
    }

  }

  void getInputSizeDist() {

    if (ImGui::Button("Read distribution from file")) {
      ImGuiFileDialog::Instance()->OpenDialog("ChooseFileDlgKey", "Choose File", ".json", ".");
    }

    std::string file = getFileName();
    readFromFile(file);

    static ImGuiTableFlags flags = ImGuiTableFlags_RowBg | ImGuiTableFlags_BordersOuter | 
                                   ImGuiTableFlags_BordersV | ImGuiTableFlags_Resizable | 
                                   ImGuiTableFlags_Reorderable | ImGuiTableFlags_Hideable;

    ImVec2 outer_size = ImVec2(0.0f,  ImGui::GetTextLineHeightWithSpacing()* 3);
    float vol_frac = 0.0f;
    float max_size = 1000.0f;
    int num_sizes = 10;
    if (ImGui::BeginTable("particle_vol_frac", 3, flags, outer_size)) {
      ImGui::TableSetupScrollFreeze(0, 1); // Make top row always visible
      ImGui::TableSetupColumn("Material name", ImGuiTableColumnFlags_None);
      ImGui::TableSetupColumn("Volume fraction of particles", ImGuiTableColumnFlags_None);
      ImGui::TableSetupColumn("Maximum particle size", ImGuiTableColumnFlags_None);
      ImGui::TableHeadersRow();
      ImGui::TableNextRow();
      ImGui::TableSetColumnIndex(0);
      static char buf[64] = "Composite"; ImGui::InputText("", buf, 64);
      ImGui::TableSetColumnIndex(1);
      ImGui::SliderFloat("%", &vol_frac, 0.0f, 100.0f); 
      ImGui::TableSetColumnIndex(2);
      ImGui::SliderFloat("(L)", &max_size, 0.0f, 100.0f); 

      ImGui::EndTable();
    }

    flags = ImGuiTableFlags_ScrollY | flags;
    outer_size = ImVec2(0.0f,  ImGui::GetTextLineHeightWithSpacing()* 10);
    ImGui::Text("Size distribution");
    if (ImGui::BeginTable("particle_size", 2, flags, outer_size)) {
      ImGui::TableSetupScrollFreeze(0, 1); // Make top row always visible
      ImGui::TableSetupColumn("Size passing", ImGuiTableColumnFlags_None);
      ImGui::TableSetupColumn("Volume fraction", ImGuiTableColumnFlags_None);
      ImGui::TableHeadersRow();

      for (int row = 0; row < num_sizes; row++) {
        ImGui::PushID(row);
        ImGui::TableNextColumn();
        float size = static_cast<float>(s_sizeDist.size[row]);
        ImGui::SliderFloat("(L <=)", &size, 0.0f, max_size); 
        s_sizeDist.size[row] = size;

        ImGui::TableNextColumn();
        float frac = static_cast<float>(s_sizeDist.volFrac[row]);
        ImGui::SliderFloat("%", &frac, 0.0f, 100.0f); 
        s_sizeDist.volFrac[row] = frac;
        ImGui::PopID();
      }
      ImGui::EndTable();
    }
  }

  std::string getFileName() {

    std::string filePathName;
    if (ImGuiFileDialog::Instance()->Display("ChooseFileDlgKey")) {
      if (ImGuiFileDialog::Instance()->IsOk()) {
        filePathName = ImGuiFileDialog::Instance()->GetFilePathName();
        std::string filePath = ImGuiFileDialog::Instance()->GetCurrentPath();
        std::cout << filePathName << " " << filePath << "\n";
      }
    
      ImGuiFileDialog::Instance()->Close();
    }
    return filePathName;
  }

  void readFromFile(const std::string& file) {
  }

  void drawSizeDist() {

  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_INPUT_PART_DIST_PANEL_H__