cmake_minimum_required(VERSION 3.16)
#project(QtOpenGL33Triangle)
project(Qt6_3D_Triangle)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

#find_package(Qt6 REQUIRED COMPONENTS Widgets OpenGL)

#add_executable(QtOpenGL33Triangle main.cpp)

#target_link_libraries(QtOpenGL33Triangle Qt6::Widgets Qt6::OpenGL)

find_package(Qt6 REQUIRED COMPONENTS Gui 3DCore 3DRender 3DExtras 3DAnimation)

#
# Triangle
#
add_executable(Qt6_3D_Triangle main_qt6_3d.cpp)

target_link_libraries(Qt6_3D_Triangle Qt6::Gui Qt6::3DCore Qt6::3DRender Qt6::3DExtras)

#
# Pyramid
#
add_executable(Qt6_3D_Pyramid pyramid.cpp)

target_link_libraries(Qt6_3D_Pyramid
    Qt6::Gui
    Qt6::3DCore
    Qt6::3DRender
    Qt6::3DExtras
    Qt6::3DAnimation
)

#
# Pyramid select
#
add_executable(Qt6_3D_Pyramid_sel pyramid_sel.cpp)
target_link_libraries(Qt6_3D_Pyramid_sel
    Qt6::Gui
    Qt6::3DCore
    Qt6::3DRender
    Qt6::3DExtras
    Qt6::3DAnimation
)

#
# Pyramid gizmo
#
add_executable(Qt6_3D_Pyramid_gizmo pyramid_gizmo.cpp)
target_link_libraries(Qt6_3D_Pyramid_gizmo
    Qt6::Gui
    Qt6::3DCore
    Qt6::3DRender
    Qt6::3DExtras
    Qt6::3DAnimation
)

#
# Pyramid mouse
#
add_executable(Qt6_3D_Pyramid_mouse pyramid_mouse.cpp)
target_link_libraries(Qt6_3D_Pyramid_mouse
    Qt6::Gui
    Qt6::3DCore
    Qt6::3DRender
    Qt6::3DExtras
    Qt6::3DAnimation
)

#
# Pyramid mouse wheel
#
add_executable(Qt6_3D_Pyramid_scroll pyramid_scroll.cpp)
target_link_libraries(Qt6_3D_Pyramid_scroll
    Qt6::Gui
    Qt6::3DCore
    Qt6::3DRender
    Qt6::3DExtras
    Qt6::3DAnimation
)


