import React, { useState } from 'react';
import { ChessboardRow, ChessboardContainer, ChessboardSquare } from './styles';
import Pawn from '../pawns/pawn';
import Knight from '../pawns/knight';
import Bishop from '../pawns/bishop';
import King from '../pawns/king';
import Queen from '../pawns/queen';
import Rook from '../pawns/rook';
import { Chess } from 'chess.js';
import { movePawn, getPossibleMoves } from '../../services/pawn-actions';

const ChessBoard = () => {
  const [chess] = useState(new Chess());
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [pawnComponents, setPawnComponents] = useState({
    a1: { component: Rook, type: 'r', color: 'white' },
    b1: { component: Knight, type: 'k', color: 'white' },
    c1: { component: Bishop, type: 'b', color: 'white' },
    d1: { component: Queen, type: 'q', color: 'white' },
    e1: { component: King, type: 'k', color: 'white' },
    f1: { component: Bishop, type: 'b', color: 'white' },
    g1: { component: Knight, type: 'k', color: 'white' },
    h1: { component: Rook, type: 'r', color: 'white' },
    a2: { component: Pawn, type: 'p', color: 'white' },
    b2: { component: Pawn, type: 'p', color: 'white' },
    c2: { component: Pawn, type: 'p', color: 'white' },
    d2: { component: Pawn, type: 'p', color: 'white' },
    e2: { component: Pawn, type: 'p', color: 'white' },
    f2: { component: Pawn, type: 'p', color: 'white' },
    g2: { component: Pawn, type: 'p', color: 'white' },
    h2: { component: Pawn, type: 'p', color: 'white' },
    a7: { component: Pawn, type: 'p', color: 'black' },
    b7: { component: Pawn, type: 'p', color: 'black' },
    c7: { component: Pawn, type: 'p', color: 'black' },
    d7: { component: Pawn, type: 'p', color: 'black' },
    e7: { component: Pawn, type: 'p', color: 'black' },
    f7: { component: Pawn, type: 'p', color: 'black' },
    g7: { component: Pawn, type: 'p', color: 'black' },
    h7: { component: Pawn, type: 'p', color: 'black' },
    a8: { component: Rook, type: 'r', color: 'black' },
    b8: { component: Knight, type: 'k', color: 'black' },
    c8: { component: Bishop, type: 'b', color: 'black' },
    d8: { component: Queen, type: 'q', color: 'black' },
    e8: { component: King, type: 'k', color: 'black' },
    f8: { component: Bishop, type: 'b', color: 'black' },
    g8: { component: Knight, type: 'k', color: 'black' },
    h8: { component: Rook, type: 'r', color: 'black' },
  });

  const renderChessboard = () => {
    const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const movePawnComponent = (from, to) => {
      const updatedPawnComponents = { ...pawnComponents };

      // Retrieve the pawn component from the 'from' position
      const pawnComponent = updatedPawnComponents[from];

      // Remove the pawn component from the 'from' position
      delete updatedPawnComponents[from];

      // Set the pawn component in the 'to' position
      updatedPawnComponents[to] = pawnComponent;

      // Update the pawnComponents state with the updated pawn components
      setPawnComponents(updatedPawnComponents);
    };
    
    const handleMove = (to) => {
      if (selectedPosition && possibleMoves.includes(to)) {
        const selectedPawnComponent = pawnComponents[selectedPosition];
        movePawn(chess, selectedPosition, to);
        movePawnComponent(selectedPosition, to);
        setSelectedPosition(null);
        setPossibleMoves([]);
      }
    };
    const convertNotationToPosition = (notation) => {
      console.log(notation);
      if (notation.length > 2) {
        return notation.substring(0, 2);
      }
      return null;
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
            } else if (selectedPosition ) {
              
              if( possibleMoves.includes(position)){
                handleMove(position);
              }
            } else {
              
              setSelectedPosition(position);
              console.log('wgo', position);
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
