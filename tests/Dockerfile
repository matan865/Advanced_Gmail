FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

COPY ../src/ /app/src/
COPY ../src/python/ /app/build/src/python/
  
COPY ../tests/ /app/tests/
COPY tests/CMakeLists.txt /app/



WORKDIR /app/
RUN mkdir data



RUN mkdir -p build
WORKDIR /app/build/

RUN cmake .. && make

CMD ["./runTests"]
