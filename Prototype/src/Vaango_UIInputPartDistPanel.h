#ifndef __Vaango_UI_INPUT_PART_DIST_PANEL_H__
#define __Vaango_UI_INPUT_PART_DIST_PANEL_H__

#include <Vaango_UIPanelBase.h>
#include <Vaango_UIParticleSizeHistogramCanvas.h>
#include <Vaango_UIUtils.h>

#include <imgui.h>
#include <json.hpp>
#include <iostream>
#include <fstream>
#include <filesystem>

using json = nlohmann::json;

namespace VaangoUI {

static bool doReading = false;
static bool fileExists = false;
static bool choice = false;

class Vaango_UIInputPartDistPanel : public Vaango_UIPanelBase
{
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
      if (ImGui::BeginChild("input part dist", 
                            ImVec2(width/2, -ImGui::GetFrameHeightWithSpacing()))){
        getInputSizeDist(width/2, height - ImGui::GetFrameHeightWithSpacing()); 
        ImGui::EndChild();
      }
      //s_sizeDist.print();
    }
    ImGui::SameLine();
    {
      if (ImGui::BeginChild("display input part dist", 
                            ImVec2(0, -ImGui::GetFrameHeightWithSpacing()))) {
        drawSizeDist(width/2, height - ImGui::GetFrameHeightWithSpacing()); 
        ImGui::EndChild();
      }
    }

  }

  void getInputSizeDist(int width, int height) {

    drawWindowBox();

    if (ImGui::Button("Read distribution from file")) {
      ImGuiFileDialog::Instance()->OpenDialog("ChooseFileDlgKey", "Choose File", ".json", ".");
      doReading = true;
    }

    readFromFile(doReading);

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
    outer_size = ImVec2(0.0f,  ImGui::GetFrameHeightWithSpacing()* 11);
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

    // Rows are deleted when the volume fraction is set to zero.
    // Adding rows need an extra widget
    if (ImGui::Button("Add row")) {
      s_sizeDist.size.push_back(1.1*s_sizeDist.size.back());
      s_sizeDist.volFrac.push_back(1.0);

      // Remove values with zero vf
      std::vector<std::pair<double, double>> values; 
      for (size_t i = 0; i < s_sizeDist.volFrac.size(); i++) {
        values.emplace_back(std::make_pair(s_sizeDist.size[i], s_sizeDist.volFrac[i]));
      }
      std::cout << std::endl;
      values.erase(std::remove_if(values.begin(), values.end(),
                    [](const auto& value){return !(value.second > 0.0);}),
                  values.end());

      // Sort values
      std::sort(values.begin(), values.end(),
                [](const auto& v1, const auto& v2){return v2.first > v1.first;});
      
      // Clear and reset size and vol frac
      s_sizeDist.size.clear();
      s_sizeDist.volFrac.clear();
      for (const auto& value : values) {
        s_sizeDist.size.emplace_back(value.first);
        s_sizeDist.volFrac.emplace_back(value.second);
      }
      s_sizeDist.numSizes = values.size();
    }
  }

  void readFromFile(bool& read) {

    if (!read) return;

    std::string file; 
    if (VaangoUI::getFileName(file)) {
      s_sizeDist.size.clear();
      s_sizeDist.volFrac.clear();
      std::ifstream f(file, std::ios::in);
      if (!f.good()) {
        std::string message = "The input particle size file" + file + " does not exist\n";
        ImGui::OpenPopup(message.c_str());
      }
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

      f.close();
      read = false;
    }
  }

  void saveToFile(bool& save) const {

    // Set up json
    json data = {
      {"name", s_sizeDist.materialName},
      {"particle_vol_frac", s_sizeDist.particleVolFrac}
    };
    for (int i = 0; i < s_sizeDist.volFrac.size(); i++) {
      data["data"] += {{"size", s_sizeDist.size[i]},
                        {"frac", s_sizeDist.volFrac[i]}};
    }

    // Write to file
    static std::string file; 
    if (VaangoUI::getFileName(file)) {
      std::filesystem::path filePath(file);
      std::error_code err;
      if (std::filesystem::exists(filePath, err) && !err) {
        fileExists = true;
      }
      if (!fileExists) {
        std::ofstream f(file, std::ios::out);
        f << std::setw(4) << data << "\n";
        f.close();
        //std::cout << data << "\n";
        save = false;
        fileExists = false;
        choice = false;
        return;
      }
    }

    // Set up popup
    std::string popupTitle = "File exists. Overwrite?";
    std::string message = "The file " + file + " will be overwritten.\n";
    choice = VaangoUI::createOkCancelPopup(popupTitle, message.c_str(), fileExists);
    if (choice) {
      std::ofstream f(file, std::ios::out);
      f << std::setw(4) << data << "\n";
      f.close();
      std::cout << data << "\n";
      save = false;
      fileExists = false;
      choice = false;
      return;
    } else {
      save = true;
      fileExists = false;
      choice = false;
    }
  }

  void drawSizeDist(int width, int height) {
  
    drawWindowBox();
    Vaango_UIParticleSizeHistogramCanvas inputSizeCanvas("input size histogram",
                                                          width, height,
                                                          ParticleSizeSource::INPUT);
    inputSizeCanvas.draw();

    // Advance the ImGui cursor to claim space in the window 
    // (otherwise the window will appear small and needs to be resized)
    ImGui::Dummy(ImVec2(200, 200));
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_INPUT_PART_DIST_PANEL_H__