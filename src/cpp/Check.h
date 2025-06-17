// Check.h
#ifndef CHECK_H
#define CHECK_H

#include <string>
#include "BloomFilter.h"

using namespace std;

// Check class runs tests on URLs using the bloom filter
class Check {
public:
    // Constructor saves the bloom filter reference
    explicit Check(BloomFilter& bloomfilter);

    // Check_bool_arry returns false if any bit for URL is off
    bool Check_bool_arry(const string& url) const;

    // Check_Blacklist returns true if URL is in the saved blacklist file
    bool Check_Blacklist(const string& url) const;

private:
    // Reference to the bloom filter instance we use
    BloomFilter& m_bloomfilter;
};

#endif // CHECK_H