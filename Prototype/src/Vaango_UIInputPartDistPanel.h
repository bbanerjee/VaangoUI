#ifndef __Vaango_UI_INPUT_PART_DIST_PANEL_H__
#define __Vaango_UI_INPUT_PART_DIST_PANEL_H__

#include <Vaango_UIPanelBase.h>
#include <Vaango_UIParticleSizeHistogramCanvas.h>

#include <imgui.h>
#include <ImGuiFileDialog.h>
#include <json.hpp>
#include <iostream>
#include <fstream>

using json = nlohmann::json;

namespace VaangoUI {

class Vaango_UIInputPartDistPanel : public Vaango_UIPanelBase
{
private:

  bool d_haveFileName = false;
  bool d_doneReading = false;

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
      //s_sizeDist.print();
      ImGui::BeginChild("input part dist", ImVec2(2*width/3, 0));
      getInputSizeDist(2*width/3, height); 
      ImGui::EndChild();
      //s_sizeDist.print();
    }
    ImGui::SameLine();
    {
      ImGui::BeginChild("display input part dist", ImVec2(0, -ImGui::GetFrameHeightWithSpacing()));
      drawSizeDist(width/3, height); 
      ImGui::EndChild();
    }

  }

  void getInputSizeDist(int width, int height) {

    if (ImGui::Button("Read distribution from file")) {
      ImGuiFileDialog::Instance()->OpenDialog("ChooseFileDlgKey", "Choose File", ".json", ".");
    }

    std::string file = getFileName();
    readFromFile(file);

    static ImGuiTableFlags flags = ImGuiTableFlags_RowBg | ImGuiTableFlags_BordersOuter | 
                                   ImGuiTableFlags_BordersV | ImGuiTableFlags_Resizable | 
                                   ImGuiTableFlags_Reorderable | ImGuiTableFlags_Hideable;

    ImVec2 outer_size = ImVec2(0.0f,  ImGui::GetTextLineHeightWithSpacing()* 3);
    float volFrac = static_cast<float>(s_sizeDist.particleVolFrac);
    float maxSize = static_cast<float>(s_sizeDist.maxParticleSize);
    int num_sizes = s_sizeDist.numSizes;
    if (ImGui::BeginTable("particle_vol_frac", 3, flags, outer_size)) {
      ImGui::TableSetupScrollFreeze(0, 1); // Make top row always visible
      ImGui::TableSetupColumn("Material name", ImGuiTableColumnFlags_None);
      ImGui::TableSetupColumn("Total vol. fraction", ImGuiTableColumnFlags_None);
      ImGui::TableSetupColumn("Max. size", ImGuiTableColumnFlags_None);
      ImGui::TableHeadersRow();
      ImGui::TableNextRow();
      ImGui::TableSetColumnIndex(0);
      ImGui::InputText("", &s_sizeDist.materialName[0], 64);
      ImGui::TableSetColumnIndex(1);
      ImGui::SliderFloat("%", &volFrac, 0.0f, 100.0f); 
      ImGui::TableSetColumnIndex(2);
      ImGui::SliderFloat("(L)", &maxSize, 0.0f, 100.0f); 
      s_sizeDist.particleVolFrac = volFrac;
      s_sizeDist.maxParticleSize = maxSize;
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

      double maxSize = 0.0;
      double totVolFrac = 0.0;
      for (int row = 0; row < num_sizes; row++) {
        if (s_sizeDist.size[row] > 0.0 && s_sizeDist.volFrac[row] > 0.0) {
          ImGui::PushID(row);
          ImGui::TableNextColumn();
          float size = static_cast<float>(s_sizeDist.size[row]);
          ImGui::SliderFloat("(L <=)", &size, 0.0f, s_sizeDist.maxParticleSize); 
          s_sizeDist.size[row] = size;
          if (size > maxSize) {
            maxSize = size;
          }

          ImGui::TableNextColumn();
          float frac = static_cast<float>(s_sizeDist.volFrac[row]);
          ImGui::SliderFloat("%", &frac, 0.0f, 100.0f); 
          s_sizeDist.volFrac[row] = frac;
          totVolFrac += frac;
          ImGui::PopID();
        }
      }
      s_sizeDist.maxParticleSize = maxSize;
      s_sizeDist.particleVolFrac = totVolFrac;
      
      ImGui::EndTable();
    }
  }

  std::string getFileName() {

    std::string filePathName;
    if (ImGuiFileDialog::Instance()->Display("ChooseFileDlgKey")) {
      if (ImGuiFileDialog::Instance()->IsOk()) {
        filePathName = ImGuiFileDialog::Instance()->GetFilePathName();
        //std::string filePath = ImGuiFileDialog::Instance()->GetCurrentPath();
        //std::cout << filePathName << " " << filePath << "\n";
        d_haveFileName = true;
        d_doneReading = false;
      }
    
      ImGuiFileDialog::Instance()->Close();
    }
    return filePathName;
  }

  void readFromFile(const std::string& file) {

    if (d_haveFileName && !d_doneReading) {
      s_sizeDist.size.clear();
      s_sizeDist.volFrac.clear();
      std::ifstream f(file);
      json data = json::parse(f);
      s_sizeDist.materialName = data["name"];
      s_sizeDist.particleVolFrac = data["particle_vol_frac"];
      for (auto val : data["data"]) {
        s_sizeDist.size.push_back(val["size"]);
        s_sizeDist.volFrac.push_back(val["frac"]);
      }
      s_sizeDist.numSizes = s_sizeDist.size.size();
      auto elem = std::max_element(s_sizeDist.size.begin(),
                                   s_sizeDist.size.end());
      s_sizeDist.maxParticleSize = *elem;

      d_doneReading = true;
    }
  }

  void drawSizeDist(int width, int height) {
  
    Vaango_UIParticleSizeHistogramCanvas inputSizeCanvas("input size histogram",
                                                          width, height,
                                                          ParticleSizeSource::INPUT);
    inputSizeCanvas.draw();

    /*
    ImDrawList* draw_list = ImGui::GetWindowDrawList();

    // Get the current ImGui cursor position
    ImVec2 p = ImGui::GetCursorScreenPos();

    // Draw a red circle
    draw_list->AddCircleFilled(ImVec2(p.x + 50, p.y + 50), 30.0f, IM_COL32(255, 0, 0, 255), 16);

    // Draw a 3 pixel thick yellow line
    draw_list->AddLine(ImVec2(p.x, p.y), ImVec2(p.x + 100.0f, p.y + 100.0f), IM_COL32(255, 255, 0, 255), 3.0f);
    */

    // Advance the ImGui cursor to claim space in the window (otherwise the window will appear small and needs to be resized)
    ImGui::Dummy(ImVec2(200, 200));
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_INPUT_PART_DIST_PANEL_H__