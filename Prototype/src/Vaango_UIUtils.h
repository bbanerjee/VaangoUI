#ifndef __Vaango_UI_UTILS_H__
#define __Vaango_UI_UTILS_H__

#include <imgui.h>
#include <ImGuiFileDialog.h>

namespace VaangoUI {

// Yellow is content region min/max
static void drawWindowBox(ImU32 color = IM_COL32(255, 255, 0, 255)) {
  ImVec2 vMin = ImGui::GetWindowContentRegionMin();
  ImVec2 vMax = ImGui::GetWindowContentRegionMax();

  vMin.x += ImGui::GetWindowPos().x;
  vMin.y += ImGui::GetWindowPos().y;
  vMax.x += ImGui::GetWindowPos().x;
  vMax.y += ImGui::GetWindowPos().y;

  ImGui::GetForegroundDrawList()->AddRect(vMin, vMax, color);
}

static ImVec2 operator-(const ImVec2& l, const ImVec2& r) { return{ l.x - r.x, l.y - r.y }; }
static ImVec2 operator+(const ImVec2& l, const ImVec2& r) { return{ l.x + r.x, l.y + r.y }; }

/// Draws vertical text. The position is the bottom left of the text rect.
static inline void AddTextVertical(ImDrawList* DrawList, 
                                   const ImFont* font, 
                                   float font_size,
                                   ImVec2 pos, 
                                   ImU32 text_color,
                                   const char *text) { 
  const ImFontGlyph *glyph;
  char c;
  ImVec2 text_size = ImGui::CalcTextSize(text);
  while ((c = *text++)) {
      glyph = font->FindGlyph(c);
      if (!glyph) continue;

      DrawList->PrimReserve(6, 4);
      DrawList->PrimQuadUV(
              pos + ImVec2(glyph->Y0, -glyph->X0),
              pos + ImVec2(glyph->Y0, -glyph->X1),
              pos + ImVec2(glyph->Y1, -glyph->X1),
              pos + ImVec2(glyph->Y1, -glyph->X0),

              ImVec2(glyph->U0, glyph->V0),
              ImVec2(glyph->U1, glyph->V0),
              ImVec2(glyph->U1, glyph->V1),
              ImVec2(glyph->U0, glyph->V1),
                  text_color);
      pos.y -= glyph->AdvanceX;
  }
}

static bool getFileName(std::string& filePathName) {

  bool haveFileName = false;
  if (ImGuiFileDialog::Instance()->Display("ChooseFileDlgKey")) {
    if (ImGuiFileDialog::Instance()->IsOk()) {
      filePathName = ImGuiFileDialog::Instance()->GetFilePathName();
      //std::string filePath = ImGuiFileDialog::Instance()->GetCurrentPath();
      //std::cout << filePathName << " " << filePath << "\n";
      haveFileName = true;
    }
  
    ImGuiFileDialog::Instance()->Close();
  }
  return haveFileName;
}

static bool createOkCancelPopup(const std::string& popupTitle,
                                const std::string& popupText,
                                bool& fileExists)
{
  if (fileExists) {
    ImGui::OpenPopup(popupTitle.c_str());
  }

  ImVec2 center = ImGui::GetMainViewport()->GetCenter();
  ImGui::SetNextWindowPos(center, ImGuiCond_Appearing, ImVec2(0.5f, 0.5f));

  bool choice = false;
  if (ImGui::BeginPopupModal(popupTitle.c_str(), NULL, ImGuiWindowFlags_AlwaysAutoResize)) {
    ImGui::Text(popupText.c_str());
    ImGui::Separator();

    static bool dont_ask_me_next_time = false;
    ImGui::PushStyleVar(ImGuiStyleVar_FramePadding, ImVec2(0, 0));
    ImGui::Checkbox("Don't ask me next time", &dont_ask_me_next_time);
    ImGui::PopStyleVar();

    if (ImGui::Button("OK##OKCancelPopup", ImVec2(120, 0))) { 
      choice = true;
      ImGui::CloseCurrentPopup(); 
    }
    ImGui::SetItemDefaultFocus();
    ImGui::SameLine();
    if (ImGui::Button("Cancel##OKCancelPopup", ImVec2(120, 0))) { 
      choice = false;
      ImGui::CloseCurrentPopup(); 
    }
    ImGui::EndPopup();
  }
  return choice;
}

} // namespace VaangoUI

#endif //__Vaango_UI_UTILS_H__