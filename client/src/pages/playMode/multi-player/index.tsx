import React, { useEffect, useState } from "react";
import "../../../styles/Board.css";
import SpaceBackground from "../../../components/particels";
import Sidebar from "../../../components/sidebar";
import socketService from "../../../services/socketServices";
import LoadingComponent from "../../../components/loading/settingroom";
import { useNavigate } from "react-router-dom";

const MultiPlayer = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    }, 1000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(checkRoomInterval);
    };
  }, [isConnected]);

  // Connect to the socket service if not already connected

  return (
    <div className="board-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="chessboard-container">
        <Sidebar />
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>You will be redirected in a room soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiPlayer;
