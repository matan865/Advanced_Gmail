#ifndef DELETE_H
#define DELETE_H

#include <string>
#include "BloomFilter.h"

class Delete {
public:
    explicit Delete(BloomFilter& bloomfilter);

    // Returns true if the URL was found in the blacklist and removed
    bool delete_URL(const std::string& url);

private:
    BloomFilter& m_bloomfilter;
};

#endif
