// Check.cpp
#include "Check.h"
#include <string>
#include <iostream>

using namespace std;

// Constructor saves the bloom filter reference so this class uses the same filter instance
Check::Check(BloomFilter& bloomfilter)
    : m_bloomfilter(bloomfilter)
{ }

// Check if all bits for the URL are on
bool Check::Check_bool_arry(const string& url) const {
    // Get bit indexes for this URL
    auto indices = m_bloomfilter.URL_to_index(url);
  
    // ////////////////////////////////////////////
    // // Debug: print all bits being checked
    // cout << "[DEBUG] checking bits for '" << url << "': ";
    // for (auto idx : indices) {
    //     cout << idx << " ";
    // }
    // cout << "\n";
    // ////////////////////////////////////////////
  
    // Check each index; if any bit is off, return false
    for (auto idx : indices) {
        if (!m_bloomfilter.check_Bit_Arry(idx)) {
            // ///////////////////////////////////
            // cout << "[DEBUG] bit " << idx << " = 0 → URL not present\n";
            // ///////////////////////////////////
            return false;
        }
    }
    // ///////////////////////////////////
    // cout << "[DEBUG] True → URL may be present\n";
    // ///////////////////////////////////
    // All bits are on, so it might be present
    return true;
}

// Check if URL is in the saved blacklist
bool Check::Check_Blacklist(const string& url) const {
    // Move file pointer to start of blacklist file
    m_bloomfilter.get_DB().reset(BLACKLIST);

    // ////////////////////////////////////
    // cout << "[DEBUG] checking blacklist for '" << url << "'\n";
    // ////////////////////////////////////

    // Read each saved URL until EOF (read() returns "")
    string line;
//    //////////////////////////////////
//     int lineNo = 0;
//     //////////////////////////////////
   
    while ((line = m_bloomfilter.get_DB().read(BLACKLIST)) != "") {
        // ///////////////////////////////////
        // lineNo++;
        // ///////////////////////////////////
        // If we find an exact match, return true
        if (line == url) {
            // ///////////////////////////////////
            // cout << "[DEBUG] line " << lineNo << ": '" << line << "' == URL → FOUND\n";
            // ///////////////////////////////////
            return true;    
        }
        //////////////////////////////
        // else {
        //     cout << "[DEBUG] line " << lineNo << ": '" << line << "' != URL\n";
        // }
        // ////////////////////////////////
    }
    // ///////////////////////////////////
    // cout << "[DEBUG] URL not found in blacklist\n";
    // ///////////////////////////////////
    // No match found, return false
    return false;  
}
