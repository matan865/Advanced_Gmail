#ifndef MAIN_H
#define MAIN_H

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

#endif // MAIN_H
