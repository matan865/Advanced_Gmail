#include "Delete.h"
#include "Database.h"

#include <vector>
#include <fstream>
#include <string>

Delete::Delete(BloomFilter& bloomfilter)
    : m_bloomfilter(bloomfilter)
{}

// Attempt to remove 'url' from the blacklist file
bool Delete::delete_URL(const std::string& url) {
    auto& db = m_bloomfilter.get_DB();

    // Read all current entries from the blacklist
    db.reset(BLACKLIST);
    std::vector<std::string> allUrls;
    std::string line;
    bool found = false;
    while ((line = db.read(BLACKLIST)) != "") {
        if (line == url) {
            found = true;
        } else {
            allUrls.push_back(line);
        }
    }

    // If URL was not present, nothing to delete
    if (!found) {
        return false;
    }

    // Rewrite the blacklist without the deleted URL
    std::ofstream ofsBlack(Database::paths[BLACKLIST], std::ios::trunc);
    for (const auto& u : allUrls) {
        ofsBlack << u << "\n";
    }

    return true;
}
