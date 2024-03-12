# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
