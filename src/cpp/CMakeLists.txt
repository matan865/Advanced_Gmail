cmake_minimum_required(VERSION 3.10)
project(my_project)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


include(FetchContent)
FetchContent_Declare(
        googletest
        URL
        https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)


set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

include_directories(src)

set(SRC_FILES
        Database.cpp
        BloomFilter.cpp
        Check.cpp
        Add_Object.cpp
        CommandHandler.cpp
        Server.cpp
        Delete.cpp
        # Url_io.cpp

        )

set(HEAD_FILES
        Database.h
        BloomFilter.h
        Check.h
        Add_Object.h
        # src/Url_io.h
        CommandHandler.h
        Server.h
        Delete.h
)

# set(TEST_FILES
#         tests/test_Database.cpp
#         tests/test_add.cpp
#         tests/test_Check.cpp
#         tests/test_BloomFilter.cpp
      
# )
# add_executable(runTests ${SRC_FILES} ${TEST_FILES} ${HEAD_FILES})
add_executable(runProgram ${SRC_FILES} ${HEAD_FILES} main.cpp)
find_package(Threads REQUIRED)
target_link_libraries(runProgram PRIVATE Threads::Threads)
# target_link_libraries(runTests gtest gtest_main)