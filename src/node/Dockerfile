# 1: Build the React client app
FROM node:20 AS build
WORKDIR /app/advanced-gmail

# Copy client package files and install dependencies
COPY advanced-gmail/package*.json ./
RUN npm install

# Copy the rest of the client app source code
COPY advanced-gmail/. .

# Build the client app for production
RUN npm run build

# 2: Setup the Node.js server
FROM node:20
WORKDIR /app

# Copy server package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the server source code and other necessary files
COPY . .

# Copy the built client app from the 'build' stage
COPY --from=build /app/advanced-gmail/build ./advanced-gmail/build

# Expose the port the server runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]