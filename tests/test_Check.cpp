#include <gtest/gtest.h>
#include "Add_Object.h"
#include "Check.h"
#include "BloomFilter.h"
#include "Database.h"

class DummyDatabase : public Database {
public:
    DummyDatabase() : Database() {
    }
};

TEST(CheckTest, ShouldFindExistingURL) {
    DummyDatabase db;
    std::vector<int> hashSeeds = {3, 5};
    int filterSize = 64;

    BloomFilter bloom(filterSize, hashSeeds, db);
    Add adder(bloom);
    Check checker(bloom);

    std::string url = "https://example.com";

    adder.add_URL(url);

    EXPECT_TRUE(checker.Check_bool_arry(url));
    
}

TEST(CheckTest, ShouldNotFindNonExistingURL) {
    DummyDatabase db;
    std::vector<int> hashSeeds = {17}; 
    int filterSize = 512;

    BloomFilter bloom(filterSize, hashSeeds, db);
    Add adder(bloom);
    Check checker(bloom);

    std::string url = "https://example.com";
    std::string nonExisting = "https://not-inserted.com";

    adder.add_URL(url);

    EXPECT_FALSE(checker.Check_bool_arry(nonExisting));
}
