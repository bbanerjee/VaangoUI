#ifndef __Vaango_UI_PARTICLE_SIZE_HISTOGRAM_CANVAS_H__
#define __Vaango_UI_PARTICLE_SIZE_HISTOGRAM_CANVAS_H__

#include <Vaango_UIData.h>

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
    : d_canvasName(title), d_canvasWidth(width), d_canvasHeight(height),
      d_flag(flag)
  {
    // Calculate the buffer area of the canvas
    d_xbuf = d_canvasWidth/10;
    d_ybuf = d_canvasHeight/10;
    d_xsmallbuf = d_xbuf/4;
    d_ysmallbuf = d_ybuf/4;

    // Calculate the drawing limits
    d_xmin = d_xbuf;
    d_ymin = d_ybuf;
    d_xmax = d_canvasWidth-d_xbuf;
    d_ymax = d_canvasHeight-d_ybuf;

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
    // Get context
    ImGuiContext* context = ImGui::GetCurrentContext();

    // Set up drawing
    ImDrawList* draw_list = ImGui::GetWindowDrawList();

    // Get the current ImGui cursor position
    ImVec2 pos = ImGui::GetCursorScreenPos();

    // Read the data to be used
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
    double partSizeMantissa = expomanti[1];

    double scale = 100.0;
    int maxSize = std::round(static_cast<float>(partSizeMantissa*scale));

    if (d_flag == ParticleSizeSource::INPUT) {
      // Draw the input vol frac histogram
      double cum1 = 0.0;
      for (int ii = 0; ii < nofSizesInp; ii++) {

        // Draw the histogram
        double size_start = 0.0;
        if (ii > 0) size_start = s_sizeDist.size[ii-1];
        double size_end = s_sizeDist.size[ii];

        size_start *= (partSizeMantissa*scale/maxPartSize);
        size_end *= (partSizeMantissa*scale/maxPartSize);

        int minXBox = getXScreenCoord(pos.x, size_start, maxSize);
        int minYBox = getYScreenCoord(pos.y, s_sizeDist.volFrac[ii]);
        int maxXBox = getXScreenCoord(pos.x, size_end, maxSize);
        int maxYBox = getYScreenCoord(pos.y, 0.0);
        int boxWidth = maxXBox-minXBox;
        int boxHeight = maxYBox-minYBox;

        // Draw the box
        draw_list->AddRectFilled(ImVec2(minXBox, minYBox), 
                                 ImVec2(minXBox + boxWidth, minYBox + boxHeight), 
                                 IM_COL32(184, 199, 27, 255));
        draw_list->AddRect(ImVec2(minXBox, minYBox), 
                           ImVec2(minXBox + boxWidth, minYBox + boxHeight), 
                           IM_COL32(0, 0, 0, 255));

        // Draw the cumulative distribution of the input
        int x1 = getXScreenCoord(pos.x, size_start, maxSize);
        int x2 = getXScreenCoord(pos.x, size_end, maxSize);
        int y1 = getYScreenCoord(pos.y, cum1);
        cum1 += s_sizeDist.volFrac[ii];
        int y2 = getYScreenCoord(pos.y, cum1);
        draw_list->AddLine(ImVec2(x1, y1), ImVec2(x2, y2),
                           IM_COL32(184, 60, 27, 255), 1.0f);
        draw_list->AddLine(ImVec2(x1+1, y1), ImVec2(x2+1, y2),
                           IM_COL32(184, 60, 27, 255), 1.0f);
        draw_list->AddLine(ImVec2(x1+2, y1), ImVec2(x2+2, y2),
                           IM_COL32(184, 60, 27, 255), 1.0f);
      }

      /*
      // Draw the calculated vol frac histogram
      double cum1Calc = 0.0;
      for (int ii = 0; ii < nofSizesCalc; ii++) {

        // Draw the histogram
        double size_start = 0.0;
        if (ii > 0) size_start = s_sizeDist.sizeCalc[ii-1];
        double size_end = s_sizeDist.sizeCalc[ii];

        int minXBox = getXScreenCoord(pos.x, size_start, maxSize);
        int minYBox = getYScreenCoord(pos.y, s_sizeDist.volFrac3DCalc[ii]);
        int maxXBox = getXScreenCoord(pos.x, size_end, maxSize);
        int maxYBox = getYScreenCoord(pos.y, 0.0);
        int boxWidth = maxXBox-minXBox;
        int boxHeight = maxYBox-minYBox;

        // Draw the box
        g.setColor(new Color(200,200,10));
        g.fillRect(minXBox, minYBox, boxWidth, boxHeight);
        g.setColor(new Color(0,0,0));
        g.drawRect(minXBox, minYBox, boxWidth, boxHeight);
        g.setColor(new Color(0,0,0));

        // Draw the cumulative distribution of computed vol frac 
        int x1 = getXScreenCoord(pos.x, size_start, maxSize);
        int x2 = getXScreenCoord(pos.x, size_end, maxSize);
        int y1 = getYScreenCoord(pos.y, cum1Calc);
        cum1Calc += s_sizeDist.volFrac3DCalc[ii];
        int y2 = getYScreenCoord(pos.y, cum1Calc);
        g.setColor(new Color(200,200,10));
        g.drawLine(x1,y1,x2,y2);
        g.drawLine(x1+1,y1,x2+1,y2);
        g.drawLine(x1+2,y1,x2+2,y2);
        g.setColor(new Color(0,0,0));
      }
      // Put the labels on the plot
      int x0 = xmin+xbuf;
      int y0 = ymin+yshortTick;
      g.setColor(new Color(184,119,27));
      g.fillRect(x0,y0,xshortTick,yshortTick);
      g.setColor(new Color(0,0,0));
      g.drawRect(x0,y0,xshortTick,yshortTick);
      g.setColor(new Color(184,60,27));
      y0 += yshortTick/2;
      g.drawLine(x0+xmedTick, y0, x0+xlongTick, y0);
      y0 += yshortTick/2;
      g.drawString("Input",x0+xbuf,y0);
      y0 = ymin+ylongTick;
      g.setColor(new Color(200,200,10));
      g.fillRect(x0,y0,xshortTick,yshortTick);
      g.drawRect(x0,y0,xshortTick,yshortTick);
      y0 += yshortTick/2;
      g.drawLine(x0+xmedTick, y0, x0+xlongTick, y0);
      y0 += yshortTick/2;
      g.drawString("Calculated",x0+xbuf,y0);
      g.setColor(new Color(0,0,0));
      */

    } else {

      /*
      // Put the labels on the plot
      int x0 = (xmax-xmin)/2;
      int y0 = ymin+yshortTick;
      y0 += yshortTick/2;
      g.setColor(new Color(84,27,225));
      g.drawLine(x0+xmedTick, y0, x0+xlongTick, y0);
      y0 += yshortTick/2;
      g.drawString("Distribution in 2D",x0+xbuf,y0);
      y0 = ymin+ylongTick;
      y0 += yshortTick/2;
      g.setColor(new Color(184,119,27));
      g.drawLine(x0+xmedTick, y0, x0+xlongTick, y0);
      y0 += yshortTick/2;
      g.drawString("Distribution in 3D",x0+xbuf,y0);
      g.setColor(new Color(0,0,0));

      // Find the total number of balls
      double numBalls2D = 0.0;
      double numBalls3D = 0.0;
      for (int ii = 0; ii < nofSizesCalc; ii++) {
        numBalls2D += s_sizeDist.freq2DCalc[ii];
        numBalls3D += s_sizeDist.freq3DCalc[ii];
      }
      numBalls2D /= 100.0;
      numBalls3D /= 100.0;

      // Draw the lines showing the distribution of balls
      double cum1 = 0.0;
      double cum2 = 0.0;
      for (int ii = 0; ii < nofSizesCalc; ii++) {

        double size_start = 0.0;
        if (ii > 0) size_start = s_sizeDist.sizeCalc[ii-1];
        double size_end = s_sizeDist.sizeCalc[ii];
        size_start *= (partSizeMantissa*scale/maxPartSize);
        size_end *= (partSizeMantissa*scale/maxPartSize);

        double freq2D_start = 0.0;
        double freq3D_start = 0.0;
        if (ii > 0) {
          freq2D_start = s_sizeDist.freq2DCalc[ii-1]/numBalls2D;
          freq3D_start = s_sizeDist.freq3DCalc[ii-1]/numBalls3D;
        }
        double freq2D_end = s_sizeDist.freq2DCalc[ii]/numBalls2D;
        double freq3D_end = s_sizeDist.freq3DCalc[ii]/numBalls3D;

        int x1 = getXScreenCoord(size_start, maxSize);
        int x2 = getXScreenCoord(size_end, maxSize);
        int y1 = getYScreenCoord(freq2D_start);
        int y2 = getYScreenCoord(freq2D_end);
        g.setColor(new Color(84,27,225));
          g.drawLine(x1,y1,x2,y2);
        g.drawLine(x1+1,y1,x2+1,y2);
        g.drawLine(x1+2,y1,x2+2,y2);

        y1 = getYScreenCoord(freq3D_start);
        y2 = getYScreenCoord(freq3D_end);
        g.setColor(new Color(184,119,27));
        g.drawLine(x1,y1,x2,y2);
        g.drawLine(x1+1,y1,x2+1,y2);
        g.drawLine(x1+2,y1,x2+2,y2);

        g.setColor(new Color(0,0,0));

        // Draw the cumulative distribution of the frequencies
        y1 = getYScreenCoord(cum1);
        cum1 += freq2D_end;
        y2 = getYScreenCoord(cum1);
        g.setColor(new Color(84,27,225));
        g.drawLine(x1,y1,x2,y2);
        g.drawLine(x1+1,y1,x2+1,y2);
        g.drawLine(x1+2,y1,x2+2,y2);

        y1 = getYScreenCoord(cum2);
        cum2 += freq3D_end;
          y2 = getYScreenCoord(cum2);
        g.setColor(new Color(184,119,27));
        g.drawLine(x1,y1,x2,y2);
        g.drawLine(x1+1,y1,x2+1,y2);
        g.drawLine(x1+2,y1,x2+2,y2);
        g.setColor(new Color(0,0,0));
      }
      */
    }
  }

  // Get the screen coordinates of a world point
  int getXScreenCoord(int x0, double coord, int maxSize) {
    return x0 + d_xmin + static_cast<int> (coord/maxSize*(d_xmax-d_xmin));
  }
  int getYScreenCoord(int y0, double coord) {
    return y0 + d_ymax - static_cast<int> (coord/100.0*(d_ymax-d_ymin));
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

    // Draw the highlighted rects
    int x = pos.x + d_xmin - d_xbuf;
    int y = pos.y + d_ymin;
    draw_list->AddRectFilled(ImVec2(x, y), ImVec2(x + d_xbuf, y + d_ymax - d_ymin), 
                             IM_COL32(230, 163, 4, 255));
    x = pos.x + d_xmin;
    y = pos.y + d_ymax;
    draw_list->AddRectFilled(ImVec2(x, y), ImVec2(x + d_xmax - d_xmin, y + d_ybuf),
                             IM_COL32(230, 163, 4, 255));

    // Draw the box
    x = pos.x + d_xmin;
    y = pos.y + d_ymin;
    draw_list->AddRect(ImVec2(x, y), ImVec2(x + d_xmax - d_xmin, y + d_ymax - d_ymin),
                       IM_COL32(0, 0, 0, 255));

    // Plot the ticks in the x direction

    int xloc = pos.x + d_xmin;
    int yloc = pos.y + d_ymax;
    int incr = (d_xmax-d_xmin)/10;
    std::string text = "Particle Size (x 1.0e" +
                       std::to_string(std::round((float)(partSizeExponent-2.0))) +
                       ")";
    draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                       ImVec2(pos.x + (d_xmax + d_xmin)/3, pos.y + d_ymax + d_ybuf),
                       IM_COL32(155, 155, 155, 255), text.c_str(), 0, 0.0f, 0);

    for (int i = 0; i <= 10; i++) {
      text = std::to_string(i * sizeIncr);
      if (i%10 == 0) {
        draw_list->AddLine(ImVec2(xloc, yloc), ImVec2(xloc, yloc + d_ylongTick),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(xloc - d_xshortTick, yloc + d_ybuf - 2),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      } else if (i%2 == 0) {
        draw_list->AddLine(ImVec2(xloc, yloc), ImVec2(xloc, yloc + d_yshortTick),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(xloc - d_xshortTick, yloc + d_ymedTick + 2),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      }
      xloc += incr;
    }

    // Plot the ticks in the y direction
    yloc = pos.y + d_ymax;
    incr = (d_ymax-d_ymin)/10;
    if (d_flag != ParticleSizeSource::INPUT) {
      draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                         ImVec2(xloc, yloc + (d_ymax + d_ymin)/2),
                         IM_COL32(155, 155, 155, 255), "N", 0, 0.0f, 0);
    } else {
      draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                         ImVec2(xloc, pos.y + (d_ymax + d_ymin)/2 - d_xmedTick),
                         IM_COL32(155, 155, 155, 255), "Vol (%)", 0, 0.0f, 0);
    }
    for (int i = 0; i <= 10; i++) {
      text = std::to_string(i*10);
      if (i%10 == 0) {
        draw_list->AddLine(ImVec2(pos.x + d_xmin, yloc), 
                           ImVec2(pos.x + d_xmin - d_xlongTick, yloc),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(pos.x + 2, yloc),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      } else {
        draw_list->AddLine(ImVec2(pos.x + d_xmin, yloc), 
                           ImVec2(pos.x + d_xmin - d_xshortTick, yloc),
                           IM_COL32(0, 0, 0, 255), 1.0f);
        draw_list->AddText(context->Font, context->FontSize * 1.0f, 
                           ImVec2(pos.x + d_xmin - d_xlongTick, yloc),
                           IM_COL32(0, 0, 0, 255), text.c_str(), 0, 0.0f, 0);
      } 
      yloc -= incr;
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