#!/bin/bash
# -----------------------------------------------------
# Project Setup Script (Default: Node.js/React projects)
# -----------------------------------------------------
# This script is meant to help you quickly set up
# JavaScript/TypeScript projects (Node.js, React, etc.)
# 
# ⚠️ NOTE:
#   - For other languages/frameworks (Python, Go, Rust, etc.)
#     you should adapt or replace this script.
#   - Example: `pip install -r requirements.txt` for Python,
#     or `go mod tidy` for Go.
#
# Customize this script to fit your project needs!
# -----------------------------------------------------

# Exit on first error
set -e

# Print each command before executing (for debugging)
set -x

# 1. Install Node.js dependencies
if [ -f package.json ]; then
  echo "Installing npm dependencies..."
  npm install
fi

# 2. Create a default .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  touch .env
  echo "# Add your environment variables here" > .env
fi

# 3. Run initial build (if the project defines one)
if [ -f package.json ]; then
  if npm run | grep -q build; then
    echo "Running initial build..."
    npm run build
  fi
fi

echo "Setup complete! You're ready to start coding."
