# Chess Game with React, Nest.js, and MongoDB

This repository contains a full-stack chess game developed using React for the frontend, Nest.js for the backend, and MongoDB as the database. The project implements various functionalities, including user authentication (login and register) and provides three distinct modes for playing the chess game.

## Functionalities

### User Authentication

- **Login**: Users can log in to access the chess game functionalities.
- **Register**: New users can create accounts to play the game.

### Chess Game Modes

1. **Single Player**
   - Allows the player to play against himself.

2. **Multiplayer**
   - Enables players to engage in real-time chess matches against other online players.
   - Uses Socket.io for real-time communication between players.

3. **Against AI (Stockfish)**
   - Provides an option for players to play against an AI opponent powered by Stockfish, a powerful open-source chess engine.

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Steps to Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Amodias/chessgame.git
   cd chessgame
2. **Backend Setup (Nest.js)**
   ```bash
   cd server
   npm install
   # Set up MongoDB connection in the .env file
   npm run start:dev
4. **Frontend Setup (React)**
   ```bash
   cd client
   npm install
   npm start

5. **Start Playing!**
   Access the application in your browser at http://localhost:3000.
   
**Contributing**
Contributions are welcome! Feel free to open issues for bug reports or feature requests. Pull requests are also appreciated.
