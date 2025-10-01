#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include "Database.h"
#include "BloomFilter.h"
#include "CommandHandler.h"
#include "Server.h"

int main(int argc, char* argv[]) {
    if (argc < 3) {
        return 1;
    }
    
    int port = std::stoi(argv[1]); // Port number

    std::vector<std::string> init_args;
    for (int i = 2; i < argc; ++i) {
        init_args.emplace_back(argv[i]);
    }

    //initialize BloomFilter
    Database db;
    db.reset(FIRST_CMD);
    std::string first = db.read(FIRST_CMD);

    if (first.empty()) {
        for (const auto& w : init_args) {
            db.write(w, FIRST_CMD);
        }
        db.reset(FIRST_CMD);
    }

    int size = std::stoi(init_args[0]);
    std::vector<int> hashes;
    for (size_t i = 1; i < init_args.size(); ++i) {
        hashes.push_back(std::stoi(init_args[i]));
    }

    auto bf = std::make_unique<BloomFilter>(size, hashes, db);
    bf->initialize();

    CommandHandler handler(std::move(bf));

    Server server(port, std::move(handler));
    server.run();
}
