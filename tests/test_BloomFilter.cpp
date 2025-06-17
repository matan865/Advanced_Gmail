#include <gtest/gtest.h>
#include "BloomFilter.h"
#include "Database.h"
#include "Add_Object.h"
#include <fstream>
#include <vector>
#include <string>

// DummyDatabase clears the blacklist file before each test\class DummyDatabase : public Database 
class DummyDatabase : public Database {
    public:
        DummyDatabase() : Database() {
            std::ofstream clear("/app/data/Blacklist.txt", std::ios::trunc);
            clear.close();
        }
    };  

// Test: URL_to_index returns expected number of indices within bounds
TEST(BloomFilterTest, URLtoIndexReturnsWithinRange) {
    DummyDatabase db;
    std::vector<int> hashPowers = {1, 2, 3};
    int filterSize = 100;

    BloomFilter bloom(filterSize, hashPowers, db);
    std::string url = "https://example.com";

    auto indices = bloom.URL_to_index(url);

    ASSERT_EQ(indices.size(), hashPowers.size());
    for (int idx : indices) {
        EXPECT_GE(idx, 0);
        EXPECT_LT(idx, filterSize);
    }
}

TEST(BloomFilterTest, InitializeSetsCorrectBits) {
    Database db;
    std::vector<int> hashPowers = {2, 3};
    int filterSize = 64;

    BloomFilter bloomTemp(filterSize, hashPowers, db);
    std::vector<int> indices = bloomTemp.URL_to_index("https://example.com");

    {
        std::ofstream file("/app/data/Arr.txt");
        for (int idx : indices) {
            file << idx << "\n";
        }
    }

    BloomFilter bloom(filterSize, hashPowers, db);
    bloom.initialize();

    for (int idx : indices) {
        EXPECT_TRUE(bloom.check_Bit_Arry(idx))
            << "Bit at index " << idx << " should be set after initialize()";
    }
}


// Test: manually setting a bit should make it readable
TEST(BloomFilterTest, SetBitManually) {
    DummyDatabase db;
    std::vector<int> hashes = {1};
    int size = 32;
    BloomFilter bloom(size, hashes, db);

    bloom.set_Bit_Arry(10);
    EXPECT_TRUE(bloom.check_Bit_Arry(10));
    EXPECT_FALSE(bloom.check_Bit_Arry(5));
}

// Test: add_URL should set bits in the BloomFilter
TEST(BloomFilterTest, AddShouldSetCorrectBits) {
    DummyDatabase db;
    std::vector<int> hashes = {2, 3};
    int size = 128;
    BloomFilter bloom(size, hashes, db);
    Add adder(bloom);

    std::string url = "https://example.com";
    auto expectedIndices = bloom.URL_to_index(url);

    adder.add_URL(url);

    for (int idx : expectedIndices) {
        EXPECT_TRUE(bloom.check_Bit_Arry(idx))
            << "Bit " << idx << " should be set after add_URL";
    }
}



