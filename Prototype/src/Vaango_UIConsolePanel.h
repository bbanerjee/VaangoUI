#ifndef __Vaango_UI_CONSOLE_H__
#define __Vaango_UI_CONSOLE_H__

#include <Vaango_UIPanelBase.h>

#include <imgui.h>
#include <imgui_internal.h>
#include <memory>
#include <vector>
#include <sstream>
#include <iostream>

namespace VaangoUI {

class Vaango_UIConsolePanel : public Vaango_UIPanelBase
{
public:

  Vaango_UIConsolePanel()
    : d_scrollToBottom(true)
  {
    d_items.push_back("Starting Vaango_UIConsolePanel\n");
    d_consoleCoutBuffer = std::make_unique<ConsoleBuffer>(this);
    d_consoleCerrBuffer = std::make_unique<ConsoleBuffer>(this);
    redirectStdoutToMessageConsole();
  }

  virtual ~Vaango_UIConsolePanel()
  {
    resetStdout();
  } 

public:

  void draw(const std::string& title, int width, int height)
  {
    ImGui::SetNextWindowSize(ImVec2(width, height), ImGuiCond_FirstUseEver);
    //io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;
    if (ImGui::Begin(title.c_str(), &d_isVisible, 0)) {

      if (ImGui::BeginChild("MessageScrollRegion",
                        ImVec2(0, -ImGui::GetFrameHeightWithSpacing()),
                        false, ImGuiWindowFlags_HorizontalScrollbar)) {

        if (ImGui::BeginPopupContextWindow()) {
          if (ImGui::Selectable("Clear")) {
            clear();
          }
          ImGui::EndPopup();
        }

        for (const auto& item : d_items) {
          ImVec4 color = {1.0f, 1.0f, 1.0f, 1.0f};
          ImGui::PushStyleColor(ImGuiCol_Text, color);
          ImGui::TextUnformatted(item.c_str());
          ImGui::PopStyleColor();
        }
        if (d_scrollToBottom) {
          ImGui::SetScrollHereY(1.0f);
        }
        d_scrollToBottom = false;
        ImGui::EndChild();

      }

      ImGui::End();
    }
  }

  void clear() 
  {
    d_items.clear();
    d_scrollToBottom = true;
  }

  void addMessage(const char* format,
                  ...) IM_FMTARGS(2)
  {
    char buffer[1024 * 256];
    va_list args;
    va_start(args, format);
    vsnprintf(buffer, IM_ARRAYSIZE(buffer), format, args);
    buffer[IM_ARRAYSIZE(buffer) - 1] = 0;
    va_end(args);
    char* token = strtok(buffer, "\n");
    while (token) {
      d_items.push_back(std::string(token));
      token = strtok(NULL, "\n");
    }
    d_scrollToBottom = true;
  }

  void redirectStdoutToMessageConsole()
  {
    //std::cout << "cout captured\n";
    d_origCoutStreambuf = std::cout.rdbuf(d_consoleCoutBuffer.get());
    d_origCerrStreambuf = std::cerr.rdbuf(d_consoleCerrBuffer.get());
  }

  void resetStdout()
  {
    std::cout.rdbuf(d_origCoutStreambuf);
    std::cerr.rdbuf(d_origCerrStreambuf);
    //std::cout << "cout released\n";
  }

public:

  struct ConsoleBuffer : public std::stringbuf
  {
    ConsoleBuffer(Vaango_UIConsolePanel* console): d_console(console) {}
    
    int sync() override {
      if (!this->str().empty()) {
        d_console->addMessage("%s", this->str().c_str());
        this->str("");
      }
      return 0;
    }

    Vaango_UIConsolePanel* d_console;
  };

private:

  std::vector<std::string> d_items;
  bool d_scrollToBottom;
  std::unique_ptr<ConsoleBuffer> d_consoleCoutBuffer;
  std::unique_ptr<ConsoleBuffer> d_consoleCerrBuffer;
  std::streambuf* d_origCoutStreambuf;
  std::streambuf* d_origCerrStreambuf;
};

} // namespace VaangoUI

#endif //__Vaango_UI_CONSOLE_H__
