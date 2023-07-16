import React from 'react';
import '../styles/Board.css';
import ChessBoard from "../../components/chessboard";
import SpaceBackground from '../../components/particels';

export default function Board() {
  return (
    <div className="board-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="chessboard-container">
        <ChessBoard />
      </div>
    </div>
  );
}
