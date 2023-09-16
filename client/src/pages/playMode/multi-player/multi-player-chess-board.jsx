import React , {useState , useEffect} from "react";
import ChessBoard from "../../../components/chessboard";
import { Chess } from 'chess.js';
import socketService from "../../../services/socketServices";


const MultiPlayerChessBoard = () => {
  // const [chessState , setChessState] = useState(null);
  // useEffect(() => {
    // socketService.onPawnMove((chessState) => {
    //   setChessState(chessState);
    // });
  // }, []);

  return <ChessBoard   />;
};
export default MultiPlayerChessBoard;
