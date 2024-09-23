FROM node:20.17.0-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the source files to the container
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the application port
EXPOSE 5000

# Start the server using the production build with debugging enabled
CMD ["npm", "run", "start:prod"]