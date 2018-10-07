# Use the official node version 8 runtime
FROM node:8-slim

# Set working directory to server
WORKDIR /server

# Copy the current directory to the container at /app
ADD . /server

RUN (cd /server && rm .env)

# Install dependencies
RUN yarn install

# Expose the port
ENV PORT 8080
EXPOSE 8080

# Run the app when the container launches
CMD ["yarn", "start"]
