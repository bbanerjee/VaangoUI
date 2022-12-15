set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_FLAGS_DEBUG "-g3")

#------------------------
# Copy input files
#------------------------
configure_file(settings.ini settings.ini COPYONLY)
configure_file(../assets/Fonts/static/Ruda-Bold.ttf assets/Fonts/static/Ruda-Bold.ttf COPYONLY)
configure_file(../assets/Icons/FrontView.png assets/Icons/FrontView.png COPYONLY)

#------------------------
# Google tests
#------------------------

enable_testing()

set(FILENAME1 test_ParticleInRVE)
add_executable(${FILENAME1} ${FILENAME1}.cc)
target_include_directories(${FILENAME1} PRIVATE 
                           ..
                           ../Utils
                           ${JSON_DIR}
                           ${BOOST_INCLUDE_DIR}
                          )
target_link_libraries(${FILENAME1} 
                      ${VAANGO_UI_LIB}
                      gtest_main)
target_link_directories(${FILENAME1} PRIVATE 
                        ${OpenCASCADE_LIBRARY_DIR})
add_custom_command(TARGET ${FILENAME1}
                   POST_BUILD
                   COMMAND ${FILENAME1})

add_executable(test_UIConsole test_UIConsole.cc)
target_include_directories(test_UIConsole PRIVATE 
                           ..
                           ../Utils
                           ${IMGUI_DIR}
                           ${IMGUI_BACKEND_DIR}
                           ${GLAD_DIR})
target_link_libraries(test_UIConsole 
                      ${IMGUI_LIB}
                      ${IMGUI_BACKEND_LIB}
                      ${GLAD_LIB}
                      ${GLFW_LIBRARIES}
                      OpenGL::GL
                      ${CMAKE_DL_LIBS}
                      gtest_main)
#add_custom_command(TARGET test_UIConsole
#                   POST_BUILD
#                   COMMAND test_UIConsole)

add_executable(test_UIEnvironment 
               test_UIEnvironment.cc)
target_include_directories(test_UIEnvironment PRIVATE 
                           ..
                           ${STB_DIR}
                           ${IMGUI_DIR}
                           ${IMGUI_BACKEND_DIR}
                           ${GLAD_DIR})
target_link_libraries(test_UIEnvironment 
                      ${VAANGO_UI_LIB}
                      ${IMGUI_LIB}
                      ${IMGUI_BACKEND_LIB}
                      ${GLAD_LIB}
                      ${GLFW_LIBRARIES}
                      OpenGL::GL
                      ${CMAKE_DL_LIBS}
                      gtest_main)

add_executable(test_UILayout test_UILayout.cc)
target_include_directories(test_UILayout PRIVATE 
                           ..
                           ../Utils
                           ${IMGUI_DIR}
                           ${IMGUI_BACKEND_DIR}
                           ${GLAD_DIR})
target_link_libraries(test_UILayout 
                      ${VAANGO_UI_LIB}
                      VaangoUI_Utils
                      ${IMGUI_LIB}
                      ${IMGUI_BACKEND_LIB}
                      ${GLAD_LIB}
                      ${GLFW_LIBRARIES}
                      OpenGL::GL
                      ${CMAKE_DL_LIBS}
                      gtest_main)

# For populating VTK includes and libraries
vtk_module_autoinit(
  TARGETS ${FILENAME1}
  MODULES ${VTK_LIBRARIES}
)

include(GoogleTest)
gtest_discover_tests(${FILENAME1})
gtest_discover_tests(test_UIConsole)
gtest_discover_tests(test_UILayout)
