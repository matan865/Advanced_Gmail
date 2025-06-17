#include <gtest/gtest.h>
#include "Add_Object.h"
#include "BloomFilter.h"
#include "Check.h"
#include "Database.h"


// DummyDatabase simply inherits the existing Database implementation
class DummyDatabase : public Database {
public:
    DummyDatabase() : Database() {
    }
};

TEST(AddTest, AddUrlAndCheckCorrectBits) {
    DummyDatabase db;
    const size_t FILTER_SIZE = 128;
    // Seeds for the BloomFilter hash functions
    std::vector<int> seeds = {3, 7, 11};

    BloomFilter bloom(FILTER_SIZE, seeds, db);
    Add      adder(bloom);
    Check    checker(bloom);

    // URL to be added
    const std::string url = "https://example.org/path";

    //Before adding – ensure all relevant bits are false
    {
        auto primary = bloom.URL_to_index(url);
        for (int idx : primary) {
            EXPECT_FALSE(bloom.check_Bit_Arry(idx))
                << "Bit " << idx << " should be false before add_URL()";
        }
    }

    //Invoke add_URL
    adder.add_URL(url);

    //After adding – Check_bool_arry should return true
    EXPECT_TRUE(checker.Check_bool_arry(url))
        << "Check_bool_arry() should return true after add_URL()";

    //Verify each individual bit is set to true
    {
        auto primary = bloom.URL_to_index(url);
        for (int idx : primary) {
            EXPECT_TRUE(bloom.check_Bit_Arry(idx))
                << "Bit " << idx << " was not set after add_URL()";
        }
    }
}