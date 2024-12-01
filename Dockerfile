# Use Node.js official image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port where the app will run
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
