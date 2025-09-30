// Database.cpp

#include "Database.h"
#include <iostream>
#include <fstream>

using namespace std;

// file paths for blacklist, arr, and first command files
const string Database::paths[3] = {
    "/app/data/Blacklist.txt",
    "/app/data/Arr.txt",
    "/app/data/FirstCommand.txt"
};

// static arrays of streams for reading and writing
ifstream Database::ifs[3];
ofstream Database::ofs[3];

// Constructor ensures files exist and opens streams
Database::Database() {
    for (int i = 0; i < 3; ++i) {
        // Create file if missing by opening in append mode
        ofstream tmp(paths[i], ios::app);
        tmp.close();

        // Open file for reading
        ifs[i].open(paths[i]);
        if (!ifs[i].is_open()) {
            cerr << "Error opening for read: " << paths[i] << "\n";
        }

        // Open file for appending new entries
        ofs[i].open(paths[i], ios::app);
        if (!ofs[i].is_open()) {
            cerr << "Error opening for write: " << paths[i] << "\n";
        }
    }
}

// Write a value plus newline to the specified file
void Database::write(const string& value, FileIndex idx) {
    // Get output stream for this file index
    ostream& os = getOfs(idx);
    os << value << '\n';  
    os.flush();           
}

// Read a line from the specified file and return the line, or empty string if at end
string Database::read(FileIndex idx) {
    // Get input stream for this file index
    istream& is = getIfs(idx);
    string line;
    if (getline(is, line)) {
        // return the read line
        return line;  
    }
    // return empty string at end of file
    return "";  
}

// Reset the read pointer to start of the file
void Database::reset(FileIndex idx) {
    // Get input stream and clear flags
    istream& is = getIfs(idx);
    is.clear();              
    is.seekg(0, ios::beg);   
}
