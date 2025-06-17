
#include "CommandHandler.h"

using namespace std;

CommandHandler::CommandHandler(std::unique_ptr<BloomFilter> bf_ptr)
    : bf(std::move(bf_ptr)) 
{
    add = std::make_unique<Add>(*bf);
    check = std::make_unique<Check>(*bf);
    del = std::make_unique<Delete>(*bf);
}


bool CommandHandler::checkValidUrl(const string& url) {
    // Check if the URL starts with valid prefixes
    return (url.find("http://") == 0 || url.find("https://") == 0 ||
            url.find("http://www.") == 0 || url.find("https://www.") == 0 ||
            url.find("www.") == 0);
}

std::string CommandHandler::handleCommand(const std::string& command) {
    std::istringstream iss(command);
    std::string cmd, url;
    iss >> cmd >> url;
    // Check if the command is valid
    if (cmd.empty() || url.empty() || !checkValidUrl(url)){
        return "400 Bad Request\n";
    }
    if (cmd == "POST") {
        if (!check->Check_Blacklist(url)) { 
             // URL is not in the blacklist, add it to the bloom filter
            add->add_URL(url);
        }
        return "201 Created\n";
    }
    else if (cmd == "GET") {
    bool inBits = check->Check_bool_arry(url);

    std::string response = "200 Ok\n\n";

        if (!inBits) {
            response += "false\n"; // definitely not present
        } else {
            bool inBlacklist = check->Check_Blacklist(url);
            response += "true ";
            response += (inBlacklist ? "true\n" : "false\n");
        }
    return response;
}

    else if (cmd == "DELETE") {
    bool isDeleted = del->delete_URL(url);
    return isDeleted ? "204 No Content\n" : "404 Not Found\n";
}

    // enter logic to 404 Not Found
    else {
        return "Bad Request\n";
}
}