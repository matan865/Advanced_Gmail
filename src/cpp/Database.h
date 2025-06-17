// Database.h

// Avoid including this header more than once
#ifndef DATABASE_H
#define DATABASE_H

// include basics for string and file streams
#include <string>
#include <fstream>
using namespace std;

// these are global indexes for each file
enum FileIndex { 
    // store URLs
    BLACKLIST = 0,
    // store index positions that turned on
    ARR = 1,        
    // store initial parameters
    FIRST_CMD = 2   
};

// Database handles reading and writing to three files
class Database {
public:
    // Constructor opens each file for read and append mode
    Database();

    // Write a line (value) to the file given by idx
    void write(const string& value, FileIndex idx = BLACKLIST);

    // Read next line from the file idx and return empty string if at end of file
    string read(FileIndex idx = BLACKLIST);

    // Move read pointer back to start of file idx
    void reset(FileIndex idx = BLACKLIST);

    // File paths for each FileIndex
    static const string paths[3];
    
    
private:
    // Streams for reading from files
    static ifstream ifs[3];
    // Streams for writing to files
    static ofstream ofs[3];

    // Pick the correct input stream based on idx
    istream& getIfs(FileIndex idx) { return ifs[idx]; }
    // Pick the correct output stream based on idx
    ostream& getOfs(FileIndex idx) { return ofs[idx]; }
};

#endif
