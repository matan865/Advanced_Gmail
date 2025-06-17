#ifndef URL_IO_H
#define URL_IO_H

#include "BloomFilter.h"
#include "Database.h"
#include "Add_Object.h"
#include "Check.h"
#include <iostream>
#include <vector>
#include <memory>   
#include <sstream>
#include <string>
#include "Delete.h"

class Url_io {
public:
    Url_io();
    void run();

private:
    int m_choose_function;
    // Database object for reading/writing files
    Database db;
    // BloomFilter pointer, created after loading parameters
    std::unique_ptr<BloomFilter> bf;
    std::unique_ptr<Add> add;
    std::unique_ptr<Check> check;
    std::unique_ptr<Delete> del;

    // Buffer for user input lines
    std::string str_input;
    // Size of array loaded from first command file
    int input_size;
    // Hash counts loaded from first command file
    std::vector<int> input_hash;

    // startsWith returns true if str begins with prefix
    static bool startsWith(const std::string& str, const std::string& prefix);
    // initializeFilter loads or asks for parameters and builds filter
    void initializeFilter();
    // handleUserCommands reads commands and invokes add/check
    void handleUserCommands();
};

#endif
