
# Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app
COPY src/Clients/AngularApp/ .
# Copy package.json and package-lock.json
COPY package*.json ./
# Install Angular CLI
RUN npm install -g @angular/cli@latest --loglevel verbose
# Install dependencies 
RUN npm install --loglevel verbose
# Install dependencies 
# RUN npm install 
# Copy the rest of the app
# Make sure the ssl_certificate and ssl_certificate_key are placed in the ssl/ directory within your project
# They will be copied into the container
COPY ["src/Clients/AngularApp/ssl/localhost.pem", "src/Clients/AngularApp/ssl/"]
COPY ["src/Clients/AngularApp/ssl/localhost-key.pem", "src/Clients/AngularApp/ssl/"]

# Expose the port the app runs on
EXPOSE 5211
EXPOSE 7069
EXPOSE 5223
EXPOSE 5203

# Command to run the app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "5211", "--ssl", "true", "--ssl-cert", "src/Clients/AngularApp/ssl/localhost.pem", "--ssl-key", "src/Clients/AngularApp/ssl/localhost-key.pem"]

#docker build -f src/Clients/AngularApp/Dockerfile -t angular-client-app .
#docker run -p 5211:5211 angular-client-app

# # Use the official Node.js 18 image as a base
# FROM node:alpine

# # Set the working directory in the container
# WORKDIR /usr/src/app
# COPY . .
# # Copy package.json and package-lock.json
# COPY package*.json ./
# # Install Angular CLI
# RUN npm install -g @angular/cli@latest
# # Install dependencies
# RUN npm install
# # Copy the rest of the app

# # Make sure the ssl_certificate and ssl_certificate_key are placed in the ssl/ directory within your project
# # They will be copied into the container
# COPY ssl/localhost-key.pem ./ssl/ ssl/localhost.pem ./ssl/
# # Expose the port the app runs on
# EXPOSE 5211
# # Command to run the app
# CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "5211", "--ssl", "true", "--ssl-cert", "ssl/localhost.pem", "--ssl-key", "ssl/localhost-key.pem"]
#docker build  -t angular-client-app .