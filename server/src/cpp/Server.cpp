#include "Server.h"

using namespace std;

void Server::createSocket() {
    m_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (m_socket < 0) {
        perror("Error creating socket");
    }
    m_serverAddr.sin_family = AF_INET;
    m_serverAddr.sin_addr.s_addr = INADDR_ANY;
    m_serverAddr.sin_port = htons(m_port);
}

void Server::bindSocket() {
    if (bind(m_socket, (struct sockaddr *)&m_serverAddr, sizeof(m_serverAddr)) < 0) {
        perror("Error binding socket");
    }
}

void Server::listenForConnections() {
    if (listen(m_socket, SOMAXCONN) < 0) {
        perror("Error listening on socket");
    }
}

void Server::run() {
    listenForConnections();
    acceptLoop();
}

void Server::acceptLoop() {
    for(;;){
        int clientFd=accept(m_socket,nullptr,nullptr);
        if(clientFd<0){ perror("accept"); continue; }

        threadClientHandler(clientFd);
    }
}

void Server::threadClientHandler(int clientFd) { //here i will change to thread pool in the future
    std::thread(&Server::handleClient,this,clientFd).detach();
}

void Server::handleClient(int fd)
{
    char buf[1024];

    while (true) {                                      
        ssize_t n = recv(fd, buf, sizeof(buf) - 1, 0);
        if (n <= 0) break;                               

        buf[n] = '\0';                                 
        std::string request(buf);
        std::string response;

        if (request.rfind("GET", 0) == 0) {
            std::shared_lock lk(m_bfMtx); // can run many GET requests simultaneously.          
            response = m_handler.handleCommand(request);
        } else {
            std::unique_lock lk(m_bfMtx); // for change of the data               
            response = m_handler.handleCommand(request);
        }

        send(fd, response.c_str(), response.size(), 0);  
    }

    close(fd);                                          
}


void Server::closeServer() {
    close(m_socket);
}

Server::~Server() {
    close(m_socket);
}

// constructor set port 
Server::Server(int port, CommandHandler&& handler)
        : m_port(port), m_handler(std::move(handler)) {
    createSocket();
    bindSocket();
}

