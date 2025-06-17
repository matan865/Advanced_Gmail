#ifndef ADD_OBJECT_H
#define ADD_OBJECT_H

#include "BloomFilter.h"
#include <string>

// Add class handles adding URLs to the bloom filter
class Add {
public:
    // Constructor saves the bloom filter reference
    explicit Add(BloomFilter& bloomfilter);
   
    // add_URL takes a URL string and adds it to the filter
    void add_URL(const std::string& url);

private:
    // Reference to the bloom filter we update
    BloomFilter& m_bloomfilter;
};

#endif
