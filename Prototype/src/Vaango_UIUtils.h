#ifndef __Vaango_UI_UTILS_H__
#define __Vaango_UI_UTILS_H__

#include <imgui.h>
#include <imgui_internal.h> // Required for ImTextCharFromUtf8 if not using a custom wrapper
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

static void AddTextVertical(ImDrawList* draw_list,
                            ImFont* font,
                            float font_size,
                            ImVec2 pos,               // Bottom-left anchor
                            ImU32 col,
                            const char* text_begin,
                            const char* text_end = nullptr)
{
    // Ensure the font definition is fully visible to the compiler
    if (!font || font_size <= 0.0f || !text_begin)
        return;

    if (!text_end)
        text_end = text_begin + strlen(text_begin);

    ImVec2 cursor = pos;

    for (const char* s = text_begin; s < text_end; )
    {
        unsigned int c;
        int char_len = ImTextCharFromUtf8(&c, s, text_end);
        if (char_len <= 0) break;

        // 1. Draw the single character using the public AddText API
        // This is safer than RenderChar and works with the latest ImDrawList
        draw_list->AddText(font, font_size, cursor, col, s, s + char_len);

        // 2. Calculate advance using CalcTextSizeA (Public ImFont API)
        // This handles the scaling (font_size / font->FontSize) internally
        // We use the X component because we are rotating the "horizontal" advance 90 degrees
        ImVec2 char_size = font->CalcTextSizeA(font_size, FLT_MAX, 0.0f, s, s + char_len);
        
        // 3. Move cursor up
        cursor.y -= char_size.x;

        s += char_len;
    }
}
/*
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
      glyph = font->FindGlyphNoFallback(c);
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
*/

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
    ImGui::Text("%s", popupText.c_str());
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
