
import socket
import sys

if len(sys.argv) != 3:
    sys.exit(1)

server_ip = sys.argv[1]
server_port = int(sys.argv[2])

client_socket= socket.socket(socket.AF_INET, socket.SOCK_STREAM) #tcp
client_socket.connect((server_ip, server_port)) #connectto server

try:
    while True:
        command = input()
        client_socket.send((command + "\n").encode()) #send command to server (convert to bytes)
        response = b''    
        while not response.endswith(b'\n'): #because the server sends the response with a \n at the end
            data = client_socket.recv(1024) 
            if not data:
                print("Server closed the connection")
                sys.exit(0)
            response += data

        print(response.decode().strip()) #print the response (convert to string)
except KeyboardInterrupt:
    print()
finally:
    client_socket.close() #close the connection
        
    


