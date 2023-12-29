import React , {useState } from "react";
import ChessBoard from "../../../components/chessBoard";


const MultiPlayerChessBoard = () => {

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);



  return <ChessBoard   
      selectedPosition={selectedPosition}
      setSelectedPosition={setSelectedPosition}
      possibleMoves={possibleMoves}
      setPossibleMoves={setPossibleMoves}
      multiplayer={true} />;
};
export default MultiPlayerChessBoard;
