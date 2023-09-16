import React, { useState, useEffect , FC } from 'react';
import { ChessboardRow, ChessboardContainer, ChessboardSquare } from './styles';
import { initilaeState } from './intiale-state';
import { Chess } from 'chess.js';
import { movePawn, getPossibleMoves } from '../../services/pawn-actions';
import socketService from '../../services/socketServices';


const ChessBoard  = ({ }) =>  {
  const [chess , setChess] = useState( new Chess());
 

  
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [receivedPosition, setReceivedPosition] = useState({});
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [pawnComponents, setPawnComponents] = useState(initilaeState);

  const movePawnComponent = (from, to) => {
    const updatedPawnComponents = { ...pawnComponents };
    const pawnComponent = updatedPawnComponents[from];
    delete updatedPawnComponents[from];
    updatedPawnComponents[to] = pawnComponent;
    setPawnComponents(updatedPawnComponents);
  };

  useEffect(() => {
    
    movePawnComponent(receivedPosition.from , receivedPosition.to);

  }, [chess]);

  useEffect(() => {
    const handlePawnMove = (chessState ,  selectedPosition, to) => {
      console.log('Received chess state:', selectedPosition, to);
      setReceivedPosition({from : selectedPosition,to : to})
      setChess(new Chess(chessState));
    };
  
    socketService.onPawnMove(handlePawnMove);
  
    return () => {
      socketService.offPawnMove();
    };
  }, []);
  
  const renderChessboard = () => {
    const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

   
    
    const handleMove = (to) => {
      if (selectedPosition && possibleMoves.includes(to)) {
        movePawnComponent(selectedPosition, to);
        const {chessState } = movePawn(chess, selectedPosition, to);
        console.log(selectedPosition, to);
        setChess(chessState)
        socketService.emitPawnMove(chess.fen() , selectedPosition, to );
        setSelectedPosition(null);
        setPossibleMoves([]);
      }
    };
    
    return rows.map((row, rowIndex) => (
      <ChessboardRow key={row}>
        {columns.map((column, columnIndex) => {
          
          let position = `${column}${row}`;
          const pawnComponent = pawnComponents[position];
          const PawnComponent = pawnComponent ? pawnComponent.component : null;
          const color = pawnComponent ? pawnComponent.color : null;
         
          const handleSquareClick = () => {
            if (selectedPosition === position) {
              setSelectedPosition(null);
              setPossibleMoves([]);
            } else if (selectedPosition && possibleMoves.includes(position) ) {
                handleMove(position);
            } else {
              setSelectedPosition(position);
              setPossibleMoves(getPossibleMoves(chess, position));
            }
          };

          return (
            <ChessboardSquare
              key={column + row}
              sx={{
                backgroundColor:
                  (rowIndex + columnIndex) % 2 === 0 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(84, 84, 84, 0.75)',
                opacity: possibleMoves.includes(position) ? 0.5 : 1,
                cursor: selectedPosition ? 'pointer' : 'default',
              }}
              onClick={handleSquareClick}
            >
              {PawnComponent && <PawnComponent type={pawnComponent.type} color={color} />}
            </ChessboardSquare>
          );
        })}
      </ChessboardRow>
    ));
  };

  return <ChessboardContainer>{renderChessboard()}</ChessboardContainer>;
};

export default ChessBoard;
