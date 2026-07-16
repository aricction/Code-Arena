# Code Arena

Code Arena is a LeetCode-style coding playground with a split architecture: a Next.js/React frontend for the editor and problem UI, and a Python FastAPI backend** that powers an AI tutoring assistant via OpenAI (streaming hints from live problem context + user code) and a code execution service for test-case grading.


## Project Structure

- backend: FastAPI service for code execution, AI assistant chat, and request handling
- frontend: Next.js app for the editor, problem view, and user interface

## Features

- Monaco-based code editor
- Problem statement and example handling
- Code execution endpoint
- AI assistant integration for debugging and guidance

## Getting Started

### Backend

1. Go to the backend folder
2. Create and activate a Python virtual environment
3. Install dependencies from requirements.txt
4. Start the FastAPI server

### Frontend

1. Go to the frontend folder
2. Install dependencies with npm install
3. Start the development server with npm run dev

## Environment

Set the required environment variables in the backend .env file, including your OpenAI API key if AI features are enabled.

## Notes

This repository is currently organized as a monorepo with separate backend and frontend apps.
