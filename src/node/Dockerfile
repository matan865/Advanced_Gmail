FROM node:20

WORKDIR /app
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
