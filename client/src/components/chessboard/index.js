import React, { useState , FC } from 'react';
import { ChessboardRow, ChessboardContainer, ChessboardSquare } from './styles';
import { initilaeState } from './intiale-state';
import { Chess } from 'chess.js';
import { movePawn, getPossibleMoves } from '../../services/pawn-actions';



const ChessBoard  = ({chessStateChanger}) =>  {
  const [chess] = useState(new Chess());
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [pawnComponents, setPawnComponents] = useState(initilaeState);

  const renderChessboard = () => {
    const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const movePawnComponent = (from, to) => {
      const updatedPawnComponents = { ...pawnComponents };
      const pawnComponent = updatedPawnComponents[from];
      delete updatedPawnComponents[from];
      updatedPawnComponents[to] = pawnComponent;
      setPawnComponents(updatedPawnComponents);
    };
    
    const handleMove = (to) => {
      if (selectedPosition && possibleMoves.includes(to)) {
        movePawnComponent(selectedPosition, to);
        chessStateChanger(movePawn(chess, selectedPosition, to));
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
