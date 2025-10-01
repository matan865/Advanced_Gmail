#ifndef COMMANDHANDLER_H
#define COMMANDHANDLER_H

#include "Database.h"
#include "BloomFilter.h"
#include "Add_Object.h"
#include "Check.h"
#include "Delete.h"


#include <memory>
#include <string>
#include <sstream>
#include <vector>
#include <iostream>

class CommandHandler {
    private:
    std::unique_ptr<BloomFilter> bf;
    std::unique_ptr<Add> add;
    std::unique_ptr<Check> check;
    std::unique_ptr<Delete> del;

    public:
       CommandHandler(std::unique_ptr<BloomFilter> bf_ptr);
     std::string handleCommand(const std::string& command);
        bool checkValidUrl(const std::string& url);

};
#endif