set(VaangoUI_Utils_SRCS
    ini.c
)
set(VaangoUI_Utils_HEADERS
    ini.h
    Vaango_SettingsParser.h
    SearchUtils.h
)

include_directories (
  ${CMAKE_CURRENT_SOURCE_DIR}
)

source_group ("Header Files" FILES
  ${VaangoUI_Utils_HEADERS}
)

add_library(VaangoUI_Utils STATIC
            ${VaangoUI_Utils_SRCS}
            ${VaangoUI_Utils_HEADERS})

add_subdirectory(UnitTests)
