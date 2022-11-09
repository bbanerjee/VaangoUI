cmake_minimum_required (VERSION 3.18)
project (Learn)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON CACHE INTERNAL "")
set(CMAKE_TOOLCHAIN_FILE toolchain.cmake)

# Copy assets
configure_file(assets/Fonts/static/Ruda-Bold.ttf assets/Fonts/static/Ruda-Bold.ttf COPYONLY)

# For glad
set(GLAD_LIB /home/banerjee/Packages/glad/libglad.a)

# For glfw
find_package(PkgConfig REQUIRED)
pkg_search_module(GLFW REQUIRED glfw3)
include_directories(${GLFW_INCLUDE_DIRS})

# For opengl3
find_package(OpenGL REQUIRED)

# For VTK (needed by Opencascade)
#set(VTK_DIR /home/banerjee/Packages/VTK-9.1.0/build CACHE PATH "vtk build directory")
find_package(VTK 9.0 REQUIRED COMPONENTS
    CommonCore
    CommonColor
    CommonDataModel
    FiltersCore
    InteractionStyle
    RenderingCore
    RenderingFreeType
    RenderingGL2PSOpenGL2
    RenderingOpenGL2
    RenderingVolume
    QUIET
  )
message (STATUS "VTK_VERSION: ${VTK_VERSION}")

# For OpenCascade
#find_package(OpenCASCADE 7.6.2 
#             PATHS 
#             /home/banerjee/Packages/OCCT-7_6_2/install NO_DEFAULT_PATH
#             COMPONENTS 
#             FoundationClasses 
#             ModelingAlgorithms 
#             ModelingData
#             DataExchange
#             Visualization
#             REQUIRED)

set(OpenCASCADE_INCLUDE_DIR /home/banerjee/Packages/OCCT-7_6_2/build/include/opencascade)
include_directories(${OpenCASCADE_INCLUDE_DIR})
message(STATUS "OCC-Include-Dir: ${OpenCASCADE_INCLUDE_DIR}")

set(OpenCASCADE_LIBRARY_DIR /home/banerjee/Packages/OCCT-7_6_2/build/lin64/gcc/lib)
link_directories(${OpenCASCADE_LIBRARY_DIR})
message(STATUS "OCC-Lib-Dir: ${OpenCASCADE_LIBRARY_DIR}")

set(OpenCASCADE_LIBRARIES TKernel;TKMath;TKG2d;TKG3d;TKGeomBase;TKBRep;TKGeomAlgo;TKTopAlgo;TKPrim;TKBO;TKShHealing;TKBool;TKHLR;TKFillet;TKOffset;TKFeat;TKMesh;TKXMesh;TKService;TKV3d;TKOpenGl;TKMeshVS;TKIVtk;TKCDF;TKLCAF;TKCAF;TKBinL;TKXmlL;TKBin;TKXml;TKStdL;TKStd;TKTObj;TKBinTObj;TKXmlTObj;TKVCAF;TKXSBase;TKSTEPBase;TKSTEPAttr;TKSTEP209;TKSTEP;TKIGES;TKXCAF;TKXDEIGES;TKXDESTEP;TKSTL;TKVRML;TKXmlXCAF;TKBinXCAF;TKRWMesh;TKDraw;TKTopTest;TKOpenGlTest;TKViewerTest;TKXSDRAW;TKDCAF;TKXDEDRAW;TKTObjDRAW;TKQADraw;TKIVtkDraw)
message(STATUS "OCC-Libs: ${OpenCASCADE_LIBRARIES}")

# Find freetype libraries on Linux (don't know why the one provided by the static occt dep doesn't work on Linux)
IF(UNIX AND NOT APPLE)
  pkg_search_module(FreeType REQUIRED freetype2)
  include_directories(${FreeType_INCLUDE_DIRS})
  message(STATUS "${FreeType_INCLUDE_DIRS}")
    
  find_path (FONTCONFIG_INCLUDE_DIRS "fontconfig/fontconfig.h")
  pkg_search_module(FontConfig REQUIRED fontconfig)
  include_directories(${FontConfig_INCLUDE_DIRS})
  message(STATUS "${FontConfig_INCLUDE_DIRS}")
ENDIF()

# for stb image loader
set(STB_DIR /home/banerjee/VaangoUI/Prototype/stb)
set(STB_SRC
   ${STB_DIR}/stb_c_lexer.h
   ${STB_DIR}/stb_connected_components.h
   ${STB_DIR}/stb_divide.h
   ${STB_DIR}/stb_ds.h
   ${STB_DIR}/stb_dxt.h
   ${STB_DIR}/stb_easy_font.h
   ${STB_DIR}/stb_herringbone_wang_tile.h
   ${STB_DIR}/stb_hexwave.h
   ${STB_DIR}/stb_image.h
   ${STB_DIR}/stb_image_resize.h
   ${STB_DIR}/stb_image_write.h
   ${STB_DIR}/stb_include.h
   ${STB_DIR}/stb_leakcheck.h
   ${STB_DIR}/stb_rect_pack.h
   ${STB_DIR}/stb_sprintf.h
   ${STB_DIR}/stb_textedit.h
   ${STB_DIR}/stb_tilemap_editor.h
   ${STB_DIR}/stb_truetype.h
   ${STB_DIR}/stb_voxel_render.h)
set(STB_LIB stb_image_lib)

add_library(${STB_LIB} INTERFACE)
target_include_directories(${STB_LIB} INTERFACE ${STB_DIR})

# for imgui
set(IMGUI_DIR /home/banerjee/VaangoUI/Prototype/imgui)
set(IMGUI_BACKEND_DIR /home/banerjee/VaangoUI/Prototype/imgui/backends)
set(GLAD_DIR /home/banerjee/VaangoUI/Prototype/glad)

set(IMGUI_SRC
    ${IMGUI_DIR}/imgui.cpp
    ${IMGUI_DIR}/imgui_demo.cpp
    ${IMGUI_DIR}/imgui_draw.cpp
    ${IMGUI_DIR}/imgui_tables.cpp
    ${IMGUI_DIR}/imgui_widgets.cpp)
set(IMGUI_BACKEND_SRC
    ${IMGUI_BACKEND_DIR}/imgui_impl_glfw.cpp
    ${IMGUI_BACKEND_DIR}/imgui_impl_opengl3.cpp)
set(IMGUI_LIB imgui_lib)
set(IMGUI_BACKEND_LIB imgui_backend_lib)

add_library(${IMGUI_LIB} ${IMGUI_SRC})
target_include_directories(imgui_lib PRIVATE ${IMGUI_DIR})

add_library(${IMGUI_BACKEND_LIB} ${IMGUI_BACKEND_SRC})
target_include_directories(imgui_backend_lib PRIVATE 
                           ${IMGUI_DIR}
                           ${IMGUI_BACKEND_DIR})

# for googletests
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/refs/tags/release-1.12.1.zip
)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

# Add subdirectories
add_subdirectory(Utils)

# Base UI
set(VAANGO_UI_LIB vaango_ui_lib)
add_library(${VAANGO_UI_LIB} 
            Vaango_UIApplication.cc
            Vaango_UIBase.cc
            Vaango_UIComponentBase.cc
            Vaango_UIData.cc
            Vaango_UIEnvironment.cc
            Vaango_UILayout.cc)
target_include_directories(${VAANGO_UI_LIB} PRIVATE 
                           ${CMAKE_CURRENT_SOURCE_DIR}
                           ${CMAKE_CURRENT_SOURCE_DIR}/Utils
                           ${IMGUI_DIR}
                           ${IMGUI_BACKEND_DIR}
                           ${GLAD_DIR})
target_include_directories(${VAANGO_UI_LIB} PRIVATE 
                           ${STB_DIR})

# Unit tests
add_subdirectory(UnitTests)

# Executable
add_executable(vaango_ui
               Vaango_UI.cc)
target_include_directories(vaango_ui PRIVATE 
                           ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries (vaango_ui
                       ${VAANGO_UI_LIB}
                       ${IMGUI_LIB}
                       ${IMGUI_BACKEND_LIB}
                       ${GLAD_LIB}
                       ${GLFW_LIBRARIES}
                       OpenGL::GL
                       ${CMAKE_DL_LIBS})

## Standalone tests
#add_executable (test_occ_imgui 
#                occglfwimgui.cpp
#                OcctWindow.cpp
#                Viewer.cpp)
#target_compile_features(test_occ_imgui PRIVATE cxx_std_17)
#target_include_directories(test_occ_imgui PRIVATE 
#                           ${IMGUI_DIR}
#                           ${IMGUI_BACKEND_DIR}
#                           ${GLAD_DIR})
##target_link_directories(test_occ_imgui PRIVATE ${OpenCASCADE_LIBRARY_DIR})
#target_link_directories(test_occ_imgui PRIVATE /home/banerjee/Packages/OCCT-7_6_2/build/lin64/gcc/lib)
#target_link_libraries (test_occ_imgui
#                       ${IMGUI_LIB}
#                       ${IMGUI_BACKEND_LIB}
#                       ${OCC_LIBS}
#                       ${OpenCASCADE_LIBRARIES}
#                       ${GLAD_LIB}
#                       ${GLFW_LIBRARIES}
#                       OpenGL::GL
#                       ${CMAKE_DL_LIBS})
##vtk_module_autoinit(
##  TARGETS test_vtk
##  MODULES ${VTK_LIBRARIES}
##)

