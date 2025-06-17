#include "Url_io.h"
#include "Database.h"
#include <fstream>    
#include <sstream>
#include "Delete.h"

using namespace std;

// Constructor sets up database but leaves filter and handlers null
Url_io::Url_io()
    : db(), bf(nullptr), add(nullptr), check(nullptr), del(nullptr), input_size(0)
{}

// startsWith checks if str begins with prefix
bool Url_io::startsWith(const string& str, const string& prefix) {
    if (str.size() < prefix.size()) return false;
    return str.compare(0, prefix.size(), prefix) == 0;
}

void Url_io::initializeFilter() {
    // Reset and read the first line from FIRST_CMD file via Database
    db.reset(FIRST_CMD);
    string first = db.read(FIRST_CMD);

    // If file is empty, ask user for initial parameters
    if (first.empty()) {
        vector<string> parts;
        do {
            // Prompt student for size and hash counts
            // ////////////////////////////////////////////////
            // cout << "[DEBUG] first run - Enter initial parameters: [size] [hash1] [hash2] ...\n> ";
            // ////////////////////////////////////////////////
           
            getline(cin, str_input);

            // Split input into words
            istringstream iss(str_input);
            parts.clear();
            string w;
            while (iss >> w) parts.push_back(w);
        } while (parts.size() < 2 || parts[0] == "0");

        // Save each part as a new line in FIRST_CMD file
        for (auto &w : parts) {
            db.write(w, FIRST_CMD);
        }

        // Reload the first line after writing
        db.reset(FIRST_CMD);
        first = db.read(FIRST_CMD);
    }

    // Convert first line to bit array size
    input_size = stoi(first);

    // Read remaining lines as hash counts
    input_hash.clear();
    string line;
    while ((line = db.read(FIRST_CMD)) != "") {
        // Skip invalid lines
        try {
            input_hash.push_back(stoi(line));
        } catch(...) {
        }
    }

    // Create and initialize the bloom filter with loaded params
    bf = make_unique<BloomFilter>(input_size, input_hash, db);
    bf->initialize();

    // Prepare add and check handlers
    add = make_unique<Add>(*bf);
    check = make_unique<Check>(*bf);
    del = make_unique<Delete>(*bf);
}


void Url_io::handleUserCommands() {
    int choose_function;
    string url;

    while (true) {
        // ////////////////////////////////////////
        // cout << "[DEBUG] ready for commands - what would you like me to do? (1=add, 2=check)\n> ";
        // ////////////////////////////////////////
        // Read a full line from user
        getline(cin, str_input);
        if (str_input.empty()) {
            continue;
        }

        istringstream iss(str_input);

        // Expect command number and URL
        if (!(iss >> choose_function >> url)) {
            // /////////////////////////////////////////
            // cout << "[DEBUG] invalid input: '" << str_input << "'\n> ";
            // /////////////////////////////////////////
            continue;
        }

        // Reject extra tokens
        string extra;
        if (iss >> extra) {
            continue;
        }

        // Only command 1,2 or 3 are valid
        if (choose_function != 1 && choose_function != 2 && choose_function != 3) {
            continue;
        }

        // URL must start with valid prefix
        if (!(startsWith(url,"http://") || startsWith(url,"https://") ||
              startsWith(url,"http://www.") || startsWith(url,"https://www.")
              || startsWith(url,"www."))) {
            continue;
        }

       // Perform bloom filter checks
        if (choose_function == 1) {
            // For add command, check blacklist first
            bool L = check->Check_Blacklist(url);
            // Add URL only if not already blacklisted
            if (L) {
                continue;
            }
            add->add_URL(url);
        } else if (choose_function == 2) {
            // For check command, run bloom filter first
            bool S = check->Check_bool_arry(url);
            if (!S) {
                // If any bit is off, URL is definitely not present
                cout << "false" << endl;
            } else {
                // Only now check the blacklist file
                bool L = check->Check_Blacklist(url);
                cout << "true " << (L ? "true" : "false") << endl;
            }
        } else if (choose_function == 3) {
                // If URL is found, delete it from the blacklist
                bool isDeleted = del->delete_URL(url);
                cout << (isDeleted ? "204 No Content" : "404 Not Found") << endl;
        }
    }
}

void Url_io::run() {
    // Initialize filter parameters and data
    initializeFilter();
    // Enter user command loop
    handleUserCommands();
}