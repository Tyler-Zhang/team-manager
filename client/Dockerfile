# Use the official node version 8 runtime
FROM node:8-slim

# Set working directory to server
WORKDIR /client

# Copy the current directory to the container at /app
ADD . /client

# Install dependencies
RUN yarn install

# Build
RUN yarn build

# Expose the port
ENV PORT 80
EXPOSE 80

# Run the app when the container launches
CMD ["yarn", "prod"]
