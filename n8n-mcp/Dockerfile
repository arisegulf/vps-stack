# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Git
RUN apt-get update && apt-get install -y git

# Clone the repository
RUN git clone https://github.com/czlonkowski/n8n-mcp.git .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "run", "start" ]
