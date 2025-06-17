#include "Add_Object.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <iostream>    

using namespace std;

// Constructor saves the bloom filter reference so this class uses the same filter instance
Add::Add(BloomFilter& bloomfilter)
    : m_bloomfilter(bloomfilter)
{ }

// add_URL adds a new URL to the bloom filter and records which bits this URL turned on
void Add::add_URL(const string& url) {
    // Get the list of bit indexes for this URL
    auto indices = m_bloomfilter.URL_to_index(url);

    // Prepare a list for indexes that are still off
    vector<int> newIndexes;
    for (int index : indices) {
        // If the bit at this index is off, turn it on
        if (!m_bloomfilter.check_Bit_Arry(index)) {
           m_bloomfilter.set_Bit_Arry(index);
            // Save for write to Arr.txt later
            newIndexes.push_back(index);
        }
    }

    // Save the new URL to the blacklist file
    m_bloomfilter.get_DB().write(url, BLACKLIST);

    // Append each new bit index to Arr.txt, one per line
    for (int index : newIndexes) {
        m_bloomfilter.get_DB().write(to_string(index), ARR);
    }
//     ////////////////////////////////////
//         // Debug: print which bits were set
//         cout << "[DEBUG] added URL: " << url << "\n";
//         cout << "[DEBUG] bits set: ";
//         for (int idx : newIndexes) {
//             cout << idx << " ";
//         }
//         cout << "\n";
//     ////////////////////////////////////    
}