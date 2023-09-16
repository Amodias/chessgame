import React , {useState , useEffect} from "react";
import ChessBoard from "../../../components/chessboard";
import { Chess } from 'chess.js';
import socketService from "../../../services/socketServices";


const MultiPlayerChessBoard = () => {
  return <ChessBoard   />;
};
export default MultiPlayerChessBoard;
