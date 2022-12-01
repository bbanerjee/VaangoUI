#ifndef __Vaango_UI_UTILS_H__
#define __Vaango_UI_UTILS_H__

#include <imgui.h>

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
} // namespace VaangoUI

#endif //__Vaango_UI_UTILS_H__