#ifndef __Vaango_UI_PARTICLE_SIZE_HISTOGRAM_CANVAS_H__
#define __Vaango_UI_PARTICLE_SIZE_HISTOGRAM_CANVAS_H__

#include <Vaango_UIData.h>
#include <Vaango_UIUtils.h>
#include <Utils/UtilsGoBag.h>

#include <imgui.h>
#include <imgui_internal.h>

#include <cmath>
#include <string>
#include <iostream>

namespace VaangoUI {

enum class ParticleSizeSource {
  INPUT,
  CALCULATED
};

class Vaango_UIParticleSizeHistogramCanvas
{
private:

  std::string d_canvasName;
  int d_canvasWidth, d_canvasHeight;

  ParticleSizeSource d_flag;
  int d_xbuf, d_ybuf, 
      d_xsmallbuf, d_ysmallbuf, 
      d_xmin, d_ymin, d_xmax, d_ymax;
  int d_xshortTick, d_yshortTick, 
      d_xmedTick, d_ymedTick, 
      d_xlongTick, d_ylongTick;

public:
  Vaango_UIParticleSizeHistogramCanvas(const std::string& title, 
                                       int width, int height,
                                       const ParticleSizeSource& flag)
    : d_canvasName(title), 
      d_flag(flag)
  {
    // Set up canvas width and height
    ImVec2 vMin = ImGui::GetWindowContentRegionMin();
    ImVec2 vMax = ImGui::GetWindowContentRegionMax();
    d_canvasWidth = vMax.x - vMin.x;
    d_canvasHeight = vMax.y - vMin.y;

    // Calculate the buffer area of the canvas
    double buf = std::max(d_canvasWidth/15, d_canvasHeight/15);
    d_xbuf = static_cast<int>(buf);
    d_ybuf = static_cast<int>(buf);
    d_xsmallbuf = static_cast<int>(d_xbuf/4.0);
    d_ysmallbuf = static_cast<int>(d_ybuf/4.0);

    // Compute shifts
    int x_shift = static_cast<int>(0.5*d_xbuf);
    int y_shift = static_cast<int>(0.5*d_ybuf);

    // Calculate the drawing limits
    d_xmin = d_xbuf + x_shift;
    d_ymin = d_ybuf - y_shift;
    d_xmax = d_canvasWidth - d_xbuf + x_shift;
    d_ymax = d_canvasHeight - d_ybuf - y_shift;

    // Calculate the tick lengths
    d_xlongTick = d_xsmallbuf*3;
    d_xmedTick = d_xsmallbuf*2;
    d_xshortTick = d_xsmallbuf;
    d_ylongTick = d_ysmallbuf*3;
    d_ymedTick = d_ysmallbuf*2;
    d_yshortTick = d_ysmallbuf;
  }

  ~Vaango_UIParticleSizeHistogramCanvas() {}

public:

  void draw()
  {
    drawHistogram();
    drawDecorations();
  }

private:

  void drawHistogram() 
  {
    // Read the data to be used
    int nofSizesInp = s_sizeDist.numSizes;
    int nofSizesCalc = s_sizeDist.numSizesCalc;

    drawVolFracHistogram(nofSizesInp, s_sizeDist.size, s_sizeDist.volFrac, 
                         IM_COL32(184, 199, 27, 255), ParticleSizeSource::INPUT);
    drawVolFracHistogram(nofSizesCalc, s_sizeDist.sizeCalc, s_sizeDist.volFrac3DCalc, 
                         IM_COL32(184, 60, 27, 255), ParticleSizeSource::CALCULATED);
  }

  // Draw the input vol frac histogram
  void drawVolFracHistogram(int nofSizes,
                            const std::vector<double>& size,
                            const std::vector<double>& volFrac,
                            const ImU32& color,
                            const ParticleSizeSource& source) 
  {
    if (nofSizes == 0) return;

    // Set up drawing
    ImDrawList* draw_list = ImGui::GetWindowDrawList();

    // Get the current ImGui cursor position
    ImVec2 pos = ImGui::GetCursorScreenPos();

    // Get the maximum particle size and its exponent and mantissa
    double maxPartSize = s_sizeDist.maxParticleSize;
    maxPartSize = size[nofSizes-1];

    std::vector<double> expomanti = computeExponentMantissa(maxPartSize);
    double partSizeMantissa = expomanti[1];

    double scale = 100.0;
    int maxSize = std::round(static_cast<float>(partSizeMantissa*scale));

    // Plot the histogram
    double cum1 = 0.0;
    for (int ii = 0; ii < nofSizes; ii++) {

      // Draw the histogram
      double size_start = 0.0;
      if (ii > 0) size_start = size[ii-1];
      double size_end = size[ii];

      size_start *= (partSizeMantissa*scale/maxPartSize);
      size_end *= (partSizeMantissa*scale/maxPartSize);

      int minXBox = getXScreenCoord(pos.x, size_start, maxSize);
      int minYBox = getYScreenCoord(pos.y, volFrac[ii]);
      int maxXBox = getXScreenCoord(pos.x, size_end, maxSize);
      int maxYBox = getYScreenCoord(pos.y, 0.0);
      int boxWidth = maxXBox-minXBox;
      int boxHeight = maxYBox-minYBox;

      // Draw the box
      draw_list->AddRectFilled(ImVec2(minXBox, minYBox), 
                               ImVec2(minXBox + boxWidth, minYBox + boxHeight), 
                               color);
      draw_list->AddRect(ImVec2(minXBox, minYBox), 
                         ImVec2(minXBox + boxWidth, minYBox + boxHeight), 
                         IM_COL32(0, 0, 0, 255));

      // Draw the cumulative distribution of the input
      int x1 = getXScreenCoord(pos.x, size_start, maxSize);
      int x2 = getXScreenCoord(pos.x, size_end, maxSize);
      int y1 = getYScreenCoord(pos.y, cum1);
      cum1 += volFrac[ii];
      int y2 = getYScreenCoord(pos.y, cum1);
      draw_list->AddLine(ImVec2(x1, y1), ImVec2(x2, y2), color, 1.0f);
      draw_list->AddLine(ImVec2(x1+1, y1), ImVec2(x2+1, y2), color, 1.0f);
      draw_list->AddLine(ImVec2(x1+2, y1), ImVec2(x2+2, y2), color, 1.0f);
    }

    // Get context
    ImGuiContext* context = ImGui::GetCurrentContext();

    double size_start = s_sizeDist.size[0];
    size_start *= (partSizeMantissa*scale/maxPartSize);
    int xloc = getXScreenCoord(pos.x, size_start, maxSize);
    int yloc = 0;
    if (source == ParticleSizeSource::INPUT) {
      yloc = getYScreenCoord(pos.y, 90.0);
      draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                        ImVec2(xloc + 15, yloc),
                        color, "Input sizes", 0, 0.0f, 0);
    } else {
      yloc = getYScreenCoord(pos.y, 80.0);
      draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                        ImVec2(xloc + 15, yloc),
                        color, "Calculated sizes", 0, 0.0f, 0);
    }
    draw_list->AddLine(ImVec2(xloc, yloc+2), ImVec2(xloc+10, yloc+2), color, 1.0f);
  }

  // Get the screen coordinates of a world point
  int getXScreenCoord(int x0, double coord, int maxSize) {
    return x0 + d_xmin + static_cast<int> (std::round(coord/maxSize*(d_xmax-d_xmin)));
  }
  int getYScreenCoord(int y0, double coord) {
    return y0 + d_ymax - static_cast<int> (std::round(coord/100.0*(d_ymax-d_ymin)));
  }


  void drawDecorations() 
  {
    // Get context
    ImGuiContext* context = ImGui::GetCurrentContext();

    // Set up drawing
    ImDrawList* draw_list = ImGui::GetWindowDrawList();

    // Get the current ImGui cursor position
    ImVec2 pos = ImGui::GetCursorScreenPos();

    // Get the particle size data to fix the dimensions of the axes
    int nofSizesInp = s_sizeDist.numSizes;
    if (nofSizesInp == 0) return;
    int nofSizesCalc = s_sizeDist.numSizesCalc;

    // Get the maximum particle size and its exponent and mantissa
    double maxPartSize = s_sizeDist.maxParticleSize;
    if (d_flag == ParticleSizeSource::INPUT) {
      maxPartSize = s_sizeDist.size[nofSizesInp-1];
    } else {
      maxPartSize = s_sizeDist.sizeCalc[nofSizesCalc-1];
    }
    std::vector<double> expomanti = computeExponentMantissa(maxPartSize);
    double partSizeExponent = expomanti[0];
    double partSizeMantissa = expomanti[1];

    double scale = 100.0;
    int maxSize = std::round((float)(partSizeMantissa*scale));
    int sizeIncr = maxSize/10;

    // Get graph draw area limits
    int xmin = pos.x + d_xmin;
    int ymin = pos.y + d_ymin;
    int xmax = pos.x + d_xmax;
    int ymax = pos.y + d_ymax;
    //std::cout << "xmin: " << xmin << " xmax: " << xmax
    //          << " ymin: " << ymin << " ymax: " << ymax << "\n";

    std::vector<int> sizeTickLocs = VaangoUI::linspace<int>(xmin, xmax, 10);
    std::vector<int> vfTickLocs = VaangoUI::linspace<int>(ymin, ymax, 10);
    std::reverse(vfTickLocs.begin(), vfTickLocs.end());

    // Draw the highlighted rects
    draw_list->AddRectFilled(ImVec2(xmin - d_xbuf, ymin), 
                             ImVec2(xmin, ymax), 
                             IM_COL32(230, 163, 4, 255));
    draw_list->AddRectFilled(ImVec2(xmin, ymax), 
                             ImVec2(xmax, ymax + d_ybuf),
                             IM_COL32(230, 163, 4, 255));
    draw_list->AddRectFilled(ImVec2(xmin - d_xbuf, ymax), 
                             ImVec2(xmin, ymax + d_ybuf),
                             IM_COL32(230, 163, 4, 255));

    // Draw the box
    draw_list->AddRect(ImVec2(xmin, ymin), 
                       ImVec2(xmax, ymax),
                       IM_COL32(255, 255, 255, 255));

    // Plot the ticks in the x direction
    auto val = std::round((float)(partSizeExponent-2.0));
    const char *fmt = "%.2f";
    int sz = std::snprintf(nullptr, 0, fmt, val);
    std::vector<char> buf(sz + 1); // note +1 for null terminator
    std::snprintf(&buf[0], buf.size(), fmt, val);
    std::string text = "Particle Size (x 1.0e" +
                       std::string(&buf[0], &buf[0] + sz - 1) +
                       ")";
    draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                       ImVec2(pos.x + (d_xmax + d_xmin)/3, ymax + d_ybuf + 5),
                       IM_COL32(155, 155, 155, 255), text.c_str(), 0, 0.0f, 0);

    for (int i = 0; i <= 10; i++) {
      text = std::to_string(i * sizeIncr);
      if (i%10 == 0) {
        draw_list->AddLine(ImVec2(sizeTickLocs[i], ymax), ImVec2(sizeTickLocs[i], ymax + d_ylongTick),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(sizeTickLocs[i] - d_xshortTick, ymax + d_ymedTick - 2),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      } else if (i%2 == 0) {
        draw_list->AddLine(ImVec2(sizeTickLocs[i], ymax), ImVec2(sizeTickLocs[i], ymax + d_yshortTick),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(sizeTickLocs[i] - d_xshortTick, ymax + d_ymedTick - 2),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      }
    }

    // Plot the ticks in the y direction
    AddTextVertical(draw_list, context->Font, context->FontSize * 1.0f, 
                    ImVec2(pos.x, pos.y + (d_ymin + d_ymax)/2 + d_ybuf),
                    IM_COL32(155, 155, 155, 255), "Volume fraction (%)");

    for (int i = 0; i <= 10; i++) {
      text = std::to_string(i*10);
      if (i%10 == 0) {
        draw_list->AddLine(ImVec2(xmin, vfTickLocs[i]), 
                           ImVec2(xmin - d_xlongTick, vfTickLocs[i]),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(xmin - d_xlongTick, vfTickLocs[i]),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      } else {
        draw_list->AddLine(ImVec2(xmin, vfTickLocs[i]), 
                           ImVec2(xmin - d_xshortTick, vfTickLocs[i]),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(xmin - d_xlongTick, vfTickLocs[i]),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      } 
    }

  }

  std::vector<double> computeExponentMantissa(double val) {

    // Find the mantissa and exponent of a double
    double exp = std::abs(std::log(val)/std::log(10.0));
    if (val < 1.0) {
      exp = - std::ceil(exp);
    } else {
      exp = std::floor(exp);
    }
    double man = val*std::pow(10.0,-exp);
    std::vector<double> output = {exp, man};
    return output;
  }


};

} // namespace VaangoUI

#endif //__Vaango_UI_PARTICLE_SIZE_HISTOGRAM_CANVAS_H__