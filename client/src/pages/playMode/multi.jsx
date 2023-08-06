import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../../styles/Board.css';
import ChessBoard from "../../components/chessboard";
import SpaceBackground from '../../components/particels';
import Sidebar from '../../components/sidebar';


 const  Multi = ()=> {
  const [socket, setSocket] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const newSocket = io('http://127.0.0.1:8000'); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on('startGame', ({ roomId, player }) => {
      setGameStarted(true);
      // Handle game start, navigate to the game board, or initialize the game state
      // You can store the roomId and player in the component state for later use
    });

    newSocket.on('waiting', (message) => {
      // Handle waiting messages, show a loading screen, or inform the user about the status
      console.log(message);
    });
    if (socket) {
      console.log(socket);
      socket.emit('joinRoom');
    }
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="board-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="chessboard-container">
      
        <Sidebar/>
        <ChessBoard />
      </div>
    </div>
  );
}

export default Multi