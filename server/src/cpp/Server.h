#ifndef SERVER_H
#define SERVER_H

#include <iostream>
#include <thread>         
#include <shared_mutex>   
#include <mutex>  
#include <vector>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include "CommandHandler.h"

class Server
{
private:
    int  m_port;
    int  m_socket;
    CommandHandler m_handler;

    struct sockaddr_in m_serverAddr {};
    std::shared_mutex  m_bfMtx;     

    /* --- helper methods --- */
    void createSocket();
    void bindSocket();
    void listenForConnections();
    void acceptLoop();              
    void handleClient(int clientFd); 
    void threadClientHandler(int clientFd);

public:
    Server(int port, CommandHandler&& handler);
    void run();
    void closeServer();
    ~Server();
};

#endif
