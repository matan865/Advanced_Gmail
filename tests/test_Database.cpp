#include <gtest/gtest.h>
#include <fstream>
#include <string>
#include "Database.h"

TEST(DatabaseSimpleTest, AddAndReadUrls) {
    std::ofstream clearFile(Database::paths[FileIndex::BLACKLIST], std::ios::trunc);
    clearFile.close();

    {
        std::ofstream file(Database::paths[FileIndex::BLACKLIST], std::ios::app);
        ASSERT_TRUE(file.is_open()) << "Failed to open blacklist.txt for writing.";
        file << "http://new-url-1.com\n";
        file << "http://new-url-2.com\n";
    }

    Database db;

    std::string url;
    bool found_first = false;
    bool found_second = false;

    while ((url = db.read(FileIndex::BLACKLIST)) != "") {
        if (url == "http://new-url-1.com") {
            found_first = true;
        }
        if (url == "http://new-url-2.com") {
            found_second = true;
        }
    }

    EXPECT_TRUE(found_first) << "Did not find first URL!";
    EXPECT_TRUE(found_second) << "Did not find second URL!";
}

TEST(DatabaseSimpleTest, ReadFromEmptyFile) {
    std::ofstream file(Database::paths[FileIndex::BLACKLIST], std::ios::trunc);
    ASSERT_TRUE(file.is_open());
    file.close();

    Database db;
    std::string url = db.read(FileIndex::BLACKLIST);
    EXPECT_EQ(url, "") << "Expected empty string from empty file";
}

TEST(DatabaseSimpleTest, ResetAfterEOF) {
    {
        std::ofstream file(Database::paths[FileIndex::BLACKLIST], std::ios::trunc);
        file << "test_reset_entry\n";
    }

    Database db;
    std::string line;
    while ((line = db.read(FileIndex::BLACKLIST)) != "") {
        // Read until EOF
    }


    db.reset(FileIndex::BLACKLIST);
    EXPECT_EQ(db.read(FileIndex::BLACKLIST), "test_reset_entry");
}
