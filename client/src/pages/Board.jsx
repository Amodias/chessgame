import React from 'react';
import '../styles/Board.css'
import ChessBoard from "../components/chessboard";
import SpaceBackground from '../components/particels';

export default function Board() {
  return (
    <div>
      <SpaceBackground />
      <ChessBoard className="board-container"/>
    </div>
  );
}