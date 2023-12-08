import React , {useState } from "react";
import '../../styles/Board.css';
import ChessBoard from "../../components/chessBoard";
import SpaceBackground from '../../components/particels';
import Sidebar from '../../components/sidebar';

export default function Single() {

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  return (
    <div className="board-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="chessboard-container">
      
        <Sidebar/>
        <ChessBoard   
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        possibleMoves={possibleMoves}
        setPossibleMoves={setPossibleMoves}
        multiplayer={false} />;
      </div>
    </div>
  );
}
