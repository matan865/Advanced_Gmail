#include <gtest/gtest.h>
#include <fstream>
#include <string>
#include "BloomFilter.h"
#include "Database.h"
#include "Delete.h"

TEST(DeleteFunctionalityTest, CanDeleteExistingUrl) {
    std::string testUrl = "https://to-delete.com";

    std::ofstream("/app/data/Blacklist.txt", std::ios::trunc) << testUrl << "\n";
    std::ofstream("/app/data/Arr.txt", std::ios::trunc) << "3\n5\n"; 

    Database db;
    auto bf = BloomFilter(128, {2, 3}, db);
    bf.initialize();

    Delete del(bf);
    bool deleted = del.delete_URL(testUrl);

    EXPECT_TRUE(deleted);

    db.reset(BLACKLIST);
    std::string line = db.read(BLACKLIST);
    EXPECT_TRUE(line.empty()); 
}
