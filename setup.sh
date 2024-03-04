#!/bin/bash

# Detecting the user's operating system
export POSTGRES_PASSWORD="dad_pass"
export POSTGRES_DB="dad"
export POSTGRES_USER="dad_user"
export DB_HOST_FOR_BACKEND="localhost"
export DB_PORT_FOR_BACKEND=5432
export BACKEND_URL="localhost"
export BACKEND_PORT=5000
export FRONTEND_URL="localhost"
export FRONTEND_PORT=3000

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux detected
    echo "Detected Linux OS" 
    # Start Python backend
    cd Backend
    python server.py &
    # Start React frontend and install dependencies 
    cd ../Frontend
    npm install
    npm run start
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS detected 
    echo "Detected macOS"
    # Start Python backend
    cd Backend
    python server.py &
    # Start React frontend and install dependencies 
    cd ../Frontend
    npm install
    npm run start
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows detected
    echo "Detected Windows OS"
    # Start Python backend
    cd Backend
    start python server.py
    # Start React frontend and install dependencies 
    cd ../Frontend
    start npm install
    start npm run start
else
    echo "Unsupported operating system"
    exit 1
fi