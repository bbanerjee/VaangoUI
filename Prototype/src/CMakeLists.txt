cmake_minimum_required (VERSION 3.18)
project (Learn)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON CACHE INTERNAL "")
set(CMAKE_TOOLCHAIN_FILE toolchain.cmake)

# Copy assets
configure_file(assets/Fonts/static/Ruda-Bold.ttf assets/Fonts/static/Ruda-Bold.ttf COPYONLY)

message(STATUS "Current source dir = ${CMAKE_SOURCE_DIR}")

# Package directory for OpenCascade/VTK etc. large packages
set(PACKAGE_DIR /home/banerjee/Packages)

# For glad
set(GLAD_DIR ${CMAKE_SOURCE_DIR}/../glad)
set(GLAD_LIB ${CMAKE_SOURCE_DIR}/../glad/libglad.a)

# For glfw
find_package(PkgConfig REQUIRED)
pkg_search_module(GLFW REQUIRED glfw3)
include_directories(${GLFW_INCLUDE_DIRS})

# For opengl3
find_package(OpenGL REQUIRED)

# For VTK (also needed by Opencascade)
#set(VTK_DIR ${PACKAGE_DIR}/VTK-9.1.0/build CACHE PATH "vtk build directory")
#set(VTK_INCLUDE_DIR ${PACKAGE_DIR}/VTK-9.1.0/install/include/vtk-9.1)
find_package(VTK 9.1 REQUIRED COMPONENTS
    CommonCore
    CommonColor
    CommonDataModel
    FiltersCore
    FiltersSources
    InteractionStyle
    InteractionWidgets
    RenderingAnnotation
    RenderingCore
    RenderingFreeType
    RenderingGL2PSOpenGL2
    RenderingOpenGL2
    RenderingVolume
    IOImage
    QUIET
  )
message (STATUS "VTK_VERSION: ${VTK_VERSION}")

# For OpenCascade
#find_package(OpenCASCADE 7.9.0 
#             PATHS 
#             ${PACKAGE_DIR}/OpenCascade/install1 NO_DEFAULT_PATH
#             COMPONENTS 
#             FoundationClasses 
#             ModelingAlgorithms 
#             ModelingData
#             DataExchange
#             Visualization
#             REQUIRED)
find_package(OpenCASCADE 7.9.0 
             PATHS 
             ${PACKAGE_DIR}/OpenCascade/install1 NO_DEFAULT_PATH
             REQUIRED)

set(OpenCASCADE_INCLUDE_DIR ${PACKAGE_DIR}/OpenCascade/install1/include/opencascade)
include_directories(${OpenCASCADE_INCLUDE_DIR})
message(STATUS "OCC-Include-Dir: ${OpenCASCADE_INCLUDE_DIR}")

set(OpenCASCADE_LIBRARY_DIR ${PACKAGE_DIR}/OpenCascade/install1/lib)
link_directories(${OpenCASCADE_LIBRARY_DIR})
message(STATUS "OCC-Lib-Dir: ${OpenCASCADE_LIBRARY_DIR}")

set(OpenCASCADE_LIBRARIES TKernel;TKMath;TKG2d;TKG3d;TKGeomBase;
                          TKBRep;TKGeomAlgo;TKTopAlgo;TKPrim;TKBO;
                          TKShHealing;TKBool;TKHLR;TKFillet;TKOffset;
                          TKFeat;TKMesh;TKXMesh;TKService;TKMeshVS;TKCDF;
                          TKLCAF;TKCAF;TKBinL;TKXmlL;TKBin;TKXml;TKStdL;TKStd;
                          TKTObj;TKBinTObj;TKXmlTObj;TKVCAF;TKXSBase;
                          TKSTEPBase;TKSTEPAttr;TKSTEP209;TKSTEP;TKIGES;
                          TKXCAF;TKXDEIGES;TKXDESTEP;TKSTL;TKVRML;TKXmlXCAF;
                          TKBinXCAF;TKRWMesh;TKV3d;TKOpenGl)
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
set(STB_DIR ${CMAKE_SOURCE_DIR}/../stb)
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
set(IMGUI_DIR ${CMAKE_SOURCE_DIR}/../imgui)
set(IMGUI_BACKEND_DIR ${CMAKE_SOURCE_DIR}/../imgui/backends)
set(IMGUI_FILE_DIALOG_DIR ${CMAKE_SOURCE_DIR}/../imguidialog)

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
set(IMGUI_FILE_DIALOG_SRC 
    ${IMGUI_FILE_DIALOG_DIR}/ImGuiFileDialog.cpp)
    
add_library(${IMGUI_LIB} ${IMGUI_SRC})
target_include_directories(imgui_lib PRIVATE ${IMGUI_DIR})

add_library(${IMGUI_BACKEND_LIB} ${IMGUI_BACKEND_SRC})
target_include_directories(imgui_backend_lib PRIVATE 
                           ${IMGUI_DIR}
                           ${IMGUI_BACKEND_DIR})

# for imnodes
set(IMNODES_DIR ${CMAKE_SOURCE_DIR}/../imnodes)

# for nlohmann JSON parser
set(JSON_DIR ${CMAKE_SOURCE_DIR}/../nlohmann)

# For Boost 1.80
set(BOOST_INCLUDE_DIR ${PACKAGE_DIR}/boost/1.80/include)

# For XML
set(TINYXML2_DIR ${CMAKE_SOURCE_DIR}/../src/Utils)

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
# Tell CMake to add the link directory to the RPATH
set(CMAKE_INSTALL_RPATH_USE_LINK_PATH TRUE)
set(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE)

set(VAANGO_UI_LIB vaango_ui_lib)
set(VAANGO_CORE_DIR
    Core)
set(VAANGO_CORE_SRC
  ${VAANGO_CORE_DIR}/Vertex.cc
  ${VAANGO_CORE_DIR}/Edge.cc
  ${VAANGO_CORE_DIR}/Face.cc
  ${VAANGO_CORE_DIR}/Voronoi.cc
)
add_library(${VAANGO_UI_LIB} 
            Vaango_UIApplication.cc
            Vaango_UIBase.cc
            Vaango_UIComponentBase.cc
            Vaango_UIData.cc
            Vaango_UIEnvironment.cc
            Vaango_UIGenerateParticlesPanel.cc
            Vaango_UIGenerateRVEParticles.cc
            Vaango_UILayout.cc
            Vaango_UIOcctWindow.cc
            ${TINYXML2_DIR}/tinyxml2.cpp
            ${IMNODES_DIR}/imnodes.cpp
            ${VAANGO_CORE_SRC})
set_source_files_properties(${VAANGO_CORE_SRC} PROPERTIES 
                            COMPILE_OPTIONS "-Wall;-g3")
#set_property(TARGET ${VAANGO_CORE_SRC} PROPERTY CXX_STANDARD 17)
target_include_directories(${VAANGO_UI_LIB} PRIVATE 
                           ${VAANGO_CORE_DIR}
                           ${IMGUI_FILE_DIALOG_DIR}
                           ${IMNODES_DIR}
                           ${JSON_DIR}
                           ${BOOST_INCLUDE_DIR}
                           ${CMAKE_CURRENT_SOURCE_DIR}
                           ${IMGUI_DIR}
                           ${IMGUI_BACKEND_DIR}
                           ${GLAD_DIR}
                           ${STB_DIR}
                           ${VTK_INCLUDE_DIR}
                           ${OpenCASCADE_INCLUDE_DIR}
                          )
target_link_libraries (${VAANGO_UI_LIB}
                       ${OpenCASCADE_LIBRARIES} # Contains VTK
                       ${VTK_LIBRARIES}
                      )

# Unit tests
add_subdirectory(UnitTests)

# Executable
add_executable(vaango_ui
               ${IMGUI_FILE_DIALOG_SRC}
               Vaango_UI.cc)
target_include_directories(vaango_ui PRIVATE 
                           ${IMGUI_DIR}
                           ${IMGUI_FILE_DIALOG_DIR}
                           ${GLAD_DIR}
                           ${VTK_INCLUDE_DIR}
                           ${OpenCASCADE_INCLUDE_DIR}
                           ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries (vaango_ui PRIVATE
                       ${VAANGO_UI_LIB}
                       ${IMGUI_LIB}
                       ${IMGUI_BACKEND_LIB}
                       ${GLAD_LIB}
                       ${GLFW_LIBRARIES}
                       OpenGL::GL
                       ${OpenCASCADE_LIBRARIES} # Contains VTK
                       ${VTK_LIBRARIES}
                       ${CMAKE_DL_LIBS}
                       )

# Find the library absolute path
set(CMAKE_INSTALL_RPATH "${OpenCASCADE_LIBRARY_DIR}")
find_library(TKMATH_LIB NAMES TKMath.so.7.9 HINTS ${OpenCASCADE_LIBRARY_DIR})
message(STATUS "TKMATH_LIB: ${TKMATH_LIB}")
if(TKMATH_LIB)
    target_link_libraries(vaango_ui PRIVATE ${TKMATH_LIB})
    
    # Ensure the directory of TKMATH_LIB is in the RPATH
    get_filename_component(TKMATH_DIR ${TKMATH_LIB} DIRECTORY)
    set_target_properties(vaango_ui PROPERTIES INSTALL_RPATH "${TKMATH_DIR}")
    set_target_properties(vaango_ui PROPERTIES BUILD_RPATH "${TKMATH_DIR}")
else()
    message(FATAL_ERROR "libTKMath not found!")
endif()

#target_link_directories(vaango_ui PRIVATE 
#                        ${OpenCASCADE_LIBRARY_DIR})
#set_target_properties(vaango_ui PROPERTIES INSTALL_RPATH ${OPENCASCADE_LIBRARY_DIR})
                         

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
#target_link_directories(test_occ_imgui PRIVATE ${PACKAGE_DIR}/OCCT-7_6_2/build/lin64/gcc/lib)
#target_link_libraries (test_occ_imgui
#                       ${IMGUI_LIB}
#                       ${IMGUI_BACKEND_LIB}
#                       ${OCC_LIBS}
#                       ${OpenCASCADE_LIBRARIES}
#                       ${GLAD_LIB}
#                       ${GLFW_LIBRARIES}
#                       OpenGL::GL
#                       ${CMAKE_DL_LIBS})

# For populating VTK includes and libraries
vtk_module_autoinit(
  TARGETS ${VAANGO_UI_LIB} vaango_ui
  MODULES ${VTK_LIBRARIES}
)

