import React, { useEffect, useState } from 'react';
import '../../styles/Board.css';
import ChessBoard from "../../components/chessboard";
import SpaceBackground from '../../components/particels';
import Sidebar from '../../components/sidebar';
import socketService from '../../services/socketServices';
import LoadingComponent from '../../components/loading/settingroom';

const Multi = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    socketService.connect(); 

    return () => {
      socketService.disconnect(); 
      clearTimeout(loadingTimeout); 
    };
  }, []);

  return (
    <div className="board-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="chessboard-container">
        <Sidebar/>
        <LoadingComponent isLoading={isLoading}>
          <ChessBoard />
        </LoadingComponent>
      </div>
    </div>
  );
}

export default Multi;
