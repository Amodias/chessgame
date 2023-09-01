import React , {useState , useEffect} from "react";
import ChessBoard from "../../../components/chessboard";
import { Chess } from 'chess.js';
import socketService from "../../../services/socketServices";


const MultiPlayerChessBoard = () => {
  const [chessState , setChessState] = useState(null);


  useEffect(() => {
    socketService.emitPawnMove(chessState);
  }, [chessState]);

  return <ChessBoard chessStateChanger={setChessState}  />;
};
export default MultiPlayerChessBoard;
