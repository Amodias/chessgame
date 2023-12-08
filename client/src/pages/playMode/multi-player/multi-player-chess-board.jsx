import React , {useState , useEffect} from "react";
import ChessBoard from "../../../components/chessBoard";
import { Chess } from "chess.js";
import {
  movePawn,
  getPossibleMoves,
  mirrorFEN,
} from "../../../services/pawn-actions";
import socketService from "../../../services/sockets/socketServices"

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
