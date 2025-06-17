#ifndef BLOOMFILTER_H
#define BLOOMFILTER_H

#include <vector>
#include <string>
#include <functional>
#include "Database.h" 

// BloomFilter class uses a array and hash functions to test membership with possible false positives
class BloomFilter {
    public:
        BloomFilter(int size, std::vector<int> arrHash, Database& database);
      
        // Copy constructor duplicates existing BloomFilter
        BloomFilter(const BloomFilter& other);
      
        // Assignment copies state from another BloomFilter
        BloomFilter& operator=(const BloomFilter& other);
      
        // get_DB gives access to the database for reads and writes
        Database& get_DB();

        // initialize loads array from persistent storage
        void initialize();
      
        // URL_to_index converts a URL string into bit positions
        std::vector<int> URL_to_index(const std::string& input) const;

        // set_Bit_Arry turns on the bit at the given index
        void set_Bit_Arry(size_t index);
      
        // check_Bit_Arry checks if the bit at the given index is on
        bool check_Bit_Arry(size_t index) const;

    private:
        // size of the array
        int m_size;
        // holds the parameters for each hash function
        std::vector<int> m_arrHash;
        // stores and retrieves data between runs
        Database& m_database;
        // array for membership tests
        std::vector<bool> m_bits;
        // hashes a string into an size_t
        size_t myHashFunction(const std::string& url) const;
};
#endif
