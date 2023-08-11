import React, { useEffect, useState } from 'react';
import '../../styles/Board.css';
import ChessBoard from "../../components/chessboard";
import SpaceBackground from '../../components/particels';
import Sidebar from '../../components/sidebar';
import socketService from '../../services/socketServices';
import LoadingComponent from '../../components/loading/settingroom';

const Multi = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRoomInterval = setInterval(() => {
      if (socketService.checkRoom()) {
        clearInterval(checkRoomInterval);
        setIsLoading(false);
      }
    }, 500);


    const isConnected = socketService.isConnected();
    if (!isConnected) {
      socketService.connect();
    }

    const unloadHandler = (event) => {
      event.preventDefault();
      event.returnValue = ''; 
    };

    window.addEventListener('beforeunload', unloadHandler);

    return () => {
      socketService.disconnect();
      clearInterval(checkRoomInterval);
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, []);

  return (
    <div className="board-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="chessboard-container">
        <Sidebar/>
        <LoadingComponent isLoading={isLoading} >
          <ChessBoard />
        </LoadingComponent>
      </div>
    </div>
  );
}

export default Multi;
