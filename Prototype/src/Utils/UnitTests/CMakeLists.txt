#------------------------
# Copy input files
#------------------------
configure_file(settings.ini settings.ini COPYONLY)

#------------------------
# Google tests
#------------------------

enable_testing()

add_executable(parser_test parser_test.cc)
target_link_libraries(parser_test 
                      VaangoUI_Utils
                      gtest_main)
add_custom_command(TARGET parser_test
                   POST_BUILD
                   COMMAND parser_test)

include(GoogleTest)
gtest_discover_tests(parser_test)
