import React from 'react';
import '../../styles/Board.css';
import ChessBoard from "../../components/chessboard";
import SpaceBackground from '../../components/particels';
import Sidebar from '../../components/sidebar';


export default function Ia() {
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
