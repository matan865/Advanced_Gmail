#include <gtest/gtest.h>
#include <thread>
#include <chrono>
#include <cstring>
#include <arpa/inet.h>
#include <unistd.h>
#include <fstream>

#include "Server.h"
#include "CommandHandler.h"
#include "BloomFilter.h"
#include "Database.h"

void clearDatabaseFiles() {
    std::ofstream("/app/data/Arr.txt", std::ios::trunc).close();
    std::ofstream("/app/data/Blacklist.txt", std::ios::trunc).close();
    std::ofstream("/app/data/FirstCommand.txt", std::ios::trunc).close();
}

void runServer(CommandHandler handler) {
    Server server(8096, std::move(handler));
    server.run(); 
}

TEST(ServerClientIntegrationTest, ServerAcceptsClientAndResponds) {
    clearDatabaseFiles(); 

    Database db;
    auto bf = std::make_unique<BloomFilter>(128, std::vector<int>{2, 3}, db);
    CommandHandler handler(std::move(bf));

    std::thread serverThread(runServer, std::move(handler));
    std::this_thread::sleep_for(std::chrono::milliseconds(500));

    int clientSock = socket(AF_INET, SOCK_STREAM, 0);
    ASSERT_NE(clientSock, -1) << "Failed to create client socket";

    sockaddr_in serverAddr{};
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(8096);
    inet_pton(AF_INET, "127.0.0.1", &serverAddr.sin_addr);

    bool connected = false;
    for (int i = 0; i < 10; ++i) {
        if (connect(clientSock, (sockaddr*)&serverAddr, sizeof(serverAddr)) == 0) {
            connected = true;
            break;
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    ASSERT_TRUE(connected) << "Client failed to connect to server";

    const char* message = "POST https://example.com\n";
    send(clientSock, message, strlen(message), 0);

    char buffer[1024] = {0};
    int bytesReceived = recv(clientSock, buffer, sizeof(buffer) - 1, 0);
    ASSERT_GT(bytesReceived, 0) << "No data received from server";

    std::string response(buffer, bytesReceived);
    EXPECT_EQ(response, "201 Created\n");

    close(clientSock);
    serverThread.join();
}
