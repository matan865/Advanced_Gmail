FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

WORKDIR /app

COPY . .

RUN mkdir data
RUN mkdir build

WORKDIR /app/build
RUN cmake .. && make runProgram

EXPOSE 5555

CMD ["./runProgram", "5555" ,"8" , "1" ,"2" ]
