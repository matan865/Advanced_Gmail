cmake_minimum_required(VERSION 3.10)
project(advanced_gmail_tests)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED True)

include(FetchContent)
FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/refs/tags/release-1.12.1.zip
)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

include_directories(src/cpp)

set(SRC_FILES
    src/cpp/Database.cpp
    src/cpp/BloomFilter.cpp
    src/cpp/Check.cpp
    src/cpp/Add_Object.cpp
    src/cpp/Url_io.cpp
    src/cpp/Server.cpp      
    src/cpp/CommandHandler.cpp 
    src/cpp/Delete.cpp
)

set(HEAD_FILES
    src/cpp/Database.h
    src/cpp/BloomFilter.h
    src/cpp/Check.h
    src/cpp/Add_Object.h
    src/cpp/Url_io.h
    src/cpp/Server.h       
    src/cpp/CommandHandler.h
    src/cpp/Delete.h
)

set(TEST_FILES
    tests/test_Database.cpp
    tests/test_add.cpp
    tests/test_Check.cpp
    tests/test_BloomFilter.cpp
    tests/test_client_server.cpp
    tests/test_Delete.cpp
)

add_executable(runTests ${SRC_FILES} ${TEST_FILES} ${HEAD_FILES})
target_link_libraries(runTests gtest gtest_main)

add_executable(runProgram ${SRC_FILES} ${HEAD_FILES} src/cpp/main.cpp)
