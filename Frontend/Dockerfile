# Create image based on the official Node image from dockerhub
FROM node:lts-buster

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

ENV BACKEND_PORT=${BACKEND_PORT}
ENV BACKEND_URL=${BACKEND_URL}

# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE ${FRONTEND_PORT}

# Serve the app
CMD ["npm", "start"]