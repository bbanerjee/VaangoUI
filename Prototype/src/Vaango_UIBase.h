#ifndef __Vaango_UI_BASE_H__
#define __Vaango_UI_BASE_H__

#include <Utils/Vaango_SettingsParser.h>

#include <imgui.h>
#include <string>

/* Forward declarations */
class AIS_InteractiveContext;
class V3d_View;

namespace VaangoUI {

/* Manipulator options */
struct ManipulatorStatus
{
    enum class Operation
    {
        MO_Translation,
        MO_Rotation,
        MO_Scale
    };

    Operation operation = Operation::MO_Translation;
    bool snap           = false;
    float snap_value    = 1.0f;
};

/* The base class for the user interface */
class Vaango_UIBase
{
public:

    Vaango_UIBase(const std::string& uiSettingsFile)
      : d_context(nullptr),
        d_view(nullptr),
        d_old_mouse_x(0),
        d_old_mouse_y(0),
        d_time_since_last_mouse_move(0.0f),
        d_settings(uiSettingsFile)     
    { }

    virtual ~Vaango_UIBase() = default;

    virtual V3d_View* view() {
        return d_view;
    }

    virtual AIS_InteractiveContext* getInteractiveContext() {
        return d_context;
    }

protected:

    virtual bool isViewVisible() = 0;

    virtual void addMessageToConsole(const char* message) {};

    virtual void draw(AIS_InteractiveContext* context,
                      V3d_View* view,
                      const bool hasFocus) {

      d_context = context;
      d_view = view;

      ImGuiIO& io = ImGui::GetIO();
      d_time_since_last_mouse_move += io.DeltaTime;

      if (io.MousePos.x != d_old_mouse_x || io.MousePos.y != d_old_mouse_y) {
        d_time_since_last_mouse_move = 0.0f;
        d_old_mouse_x = static_cast<int> (io.MousePos.x);
        d_old_mouse_y = static_cast<int> (io.MousePos.y);
      }
    }

    float timeSinceLastMouseMovement() const {
        return d_time_since_last_mouse_move;
    }

    void addImGuiTooltip(const char* tipText) const {
        if (d_time_since_last_mouse_move > 0.2f && ImGui::IsItemHovered()) {
           ImGui::SetTooltip("%s", tipText);
        }
    }

    ManipulatorStatus& getManipulatorStatus() {
        return d_manipulator_status;
    }

    void toggleSelected(const bool flag) {
        d_selected = flag;
    }

    bool isSelected() const {
        return d_selected;
    }

    void toggleAutoFocus(const bool flag) {
        d_autofocus_enabled = flag;
    }

    bool isAutoFocusEnabled() const {
        return d_autofocus_enabled;
    }

    Vaango_SettingsParser getSettings() const
    {
        return d_settings;
    }

protected:

    AIS_InteractiveContext* d_context;
    V3d_View*               d_view;
    ManipulatorStatus       d_manipulator_status;

private:

    bool  d_selected          = false;
    bool  d_autofocus_enabled = true;
    int   d_old_mouse_x;
    int   d_old_mouse_y;
    float d_time_since_last_mouse_move;     
    Vaango_SettingsParser d_settings;
};

} // namespace Vaango_UI

#endif // _Vaango_UI_BASE_H__
