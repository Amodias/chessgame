import React, { useEffect, useState } from 'react';
import '../../styles/Board.css';
import ChessBoard from "../../components/chessboard";
import SpaceBackground from '../../components/particels';
import Sidebar from '../../components/sidebar';
import socketService from '../../services/socketServices';
const Multi = () => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socketService.connect(); // Connect to the socket when the component mounts

    

    return () => {
      socketService.disconnect(); // Disconnect when the component unmounts
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

export default Multi;
