import React, { useEffect, useState } from "react";
import "../../../styles/Board.css";
import SpaceBackground from "../../../components/particels";
import Sidebar from "../../../components/sidebar";
import socketService from "../../../services/sockets/socketServices";
import LoadingComponent from "../../../components/loading/settingroom";
import MultiPlayerChessBoard from "./multi-player-chess-board";

import { useNavigate } from "react-router-dom";

const MultiPlayer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const isConnected = socketService.isConnected();
  if (!isConnected) {
    socketService.connect();
  }

  useEffect(() => {
    const checkRoomInterval = setInterval(async () => {
      const roomStatus = await socketService.checkRoom();
      if (roomStatus) {
        setIsLoading(!roomStatus);
      }
      if (!isLoading && !roomStatus) {
        setFailed(false);
      }
    }, 1000);

    return () => {
      clearInterval(checkRoomInterval);
    };
  }, [isConnected]);

  return (
    <div className="board-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="chessboard-container">
        <Sidebar />
        {failed && (
          <div className="loading-spinner">
            <p>Connexion failed, try to reload the page !</p>
          </div>
        )}
        {!failed && isLoading ? (
          <LoadingComponent />
        ) : (
          <MultiPlayerChessBoard />
        )}
      </div>
    </div>
  );
};

export default MultiPlayer;
