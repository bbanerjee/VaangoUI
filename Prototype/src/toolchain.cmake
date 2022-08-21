set(COMPILER_DIR /home/banerjee/Packages/gcc-8.5.0-install)
set(CMAKE_C_COMPILER ${COMPILER_DIR}/bin/gcc-8.5 CACHE PATH "gcc-8.5" )
set(CMAKE_CXX_COMPILER ${COMPILER_DIR}/bin/g++-8.5 CACHE PATH "g++-8.5" )
set(CMAKE_BUILD_RPATH ${COMPILER_DIR}/lib64)
