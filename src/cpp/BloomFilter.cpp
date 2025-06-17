#include "BloomFilter.h"
#include "Database.h"
#include <stdexcept>    
#include <functional>   

// Constructor sets size, hash params, and database reference
BloomFilter::BloomFilter(int size, std::vector<int> arrHash, Database& database )
    : m_size(size), m_arrHash(arrHash), m_database(database)
{
    // Create bit array with all bits off
    m_bits.resize(m_size, false);
}

// This returns the database object for reading and writing
Database& BloomFilter::get_DB() {
    return m_database;
}

// Convert URL string into list of bit positions
std::vector<int> BloomFilter::URL_to_index(const std::string& input) const {
    std::vector<int> tempArr(m_arrHash.size());

    for (size_t i = 0; i < m_arrHash.size(); ++i) {
        // First hash of the input
        size_t temp = myHashFunction(input);
        for (int j = 1; j < m_arrHash[i]; ++j) {
            temp = myHashFunction(std::to_string(temp));
        }

        int finalVal = temp % m_size;
        tempArr[i] = finalVal;
    }
    // Return all chosen bit indexes
    return tempArr;
}

// Load saved bit indexes from Arr.txt into the array
void BloomFilter::initialize() {
    m_database.reset(ARR);
    std::string idxStr;
    // Read each line (index as string) until empty
    while ((idxStr = m_database.read(ARR)) != "") {
        // Convert string to number
        size_t idx = std::stoul(idxStr);
        // Mark that bit as on in the array
        m_bits[idx] = true;
    }
}

// Turn on the bit at given index
void BloomFilter::set_Bit_Arry(size_t index) {
    m_bits[index] = true;
}

// Check if the bit at given index is on
bool BloomFilter::check_Bit_Arry(size_t index) const {
    return m_bits[index];
}

// Compute a hash value for a string URL
size_t BloomFilter::myHashFunction(const std::string& url) const {
    std::hash<std::string> hasher;
    return hasher(url);
}