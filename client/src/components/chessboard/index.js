import React , {useState} from 'react';
import { ChessboardRow, ChessboardContainer, ChessboardSquare } from './styles';
import Pawn from '../pawns/pawn';
import Knight from '../pawns/knight';
import Bishop from '../pawns/bishop';
import King from '../pawns/king';
import Queen from '../pawns/queen';
import Rook from '../pawns/rook';
import { Chess } from 'chess.js';
import { movePawn } from '../../services/pawn-actions';



const ChessBoard = () => {
  const [chess] = useState(new Chess());

  const pawnComponents = {
  a1: { component: Rook, color: 'white' },
  b1: { component: Knight, color: 'white' },
  c1: { component: Bishop, color: 'white' },
  d1: { component: Queen, color: 'white' },
  e1: { component: King, color: 'white' },
  f1: { component: Bishop, color: 'white' },
  g1: { component: Knight, color: 'white' },
  h1: { component: Rook, color: 'white' },
  a2: { component: Pawn, color: 'white' },
  b2: { component: Pawn, color: 'white' },
  c2: { component: Pawn, color: 'white' },
  d2: { component: Pawn, color: 'white' },
  e2: { component: Pawn, color: 'white' },
  f2: { component: Pawn, color: 'white' },
  g2: { component: Pawn, color: 'white' },
  h2: { component: Pawn, color: 'white' },
  a7: { component: Pawn, color: 'black' },
  b7: { component: Pawn, color: 'black' },
  c7: { component: Pawn, color: 'black' },
  d7: { component: Pawn, color: 'black' },
  e7: { component: Pawn, color: 'black' },
  f7: { component: Pawn, color: 'black' },
  g7: { component: Pawn, color: 'black' },
  h7: { component: Pawn, color: 'black' },
  a8: { component: Rook, color: 'black' },
  b8: { component: Knight, color: 'black' },
  c8: { component: Bishop, color: 'black' },
  d8: { component: Queen, color: 'black' },
  e8: { component: King, color: 'black' },
  f8: { component: Bishop, color: 'black' },
  g8: { component: Knight, color: 'black' },
  h8: { component: Rook, color: 'black' },
};

  

const renderChessboard = () => {
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return rows.map((row, rowIndex) => (
    <ChessboardRow key={row}>
      {columns.map((column, columnIndex) => {
        const position = `${column}${row}`;
        const pawnComponent = pawnComponents[position];
        const PawnComponent = pawnComponent ? pawnComponent.component : null;
        const color = pawnComponent ? pawnComponent.color : null;
        const handleMove = (from, to) => {
          const pawnComponent = pawnComponents[from];
          const pawnType = pawnComponent ? pawnComponent.component.name : null;

          if (pawnType) {
            console.log(`Pawn type: ${pawnType}`);
            const possibleMoves = chess.moves({ square: from });
            console.log(`Possible moves for ${pawnType} at ${from}:`, possibleMoves);
          }
          // movePawn(chess, from, to);
        };
        return (
          <ChessboardSquare
            key={column + row}
            sx={{
              backgroundColor:
                (rowIndex + columnIndex) % 2 === 0 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(84, 84, 84, 0.75)',
            }}
             onClick={() => handleMove(position, 'e4')} 
          >
            {PawnComponent && <PawnComponent color={color} />}
          </ChessboardSquare>
        );
      })}
    </ChessboardRow>
  ));
};


  return <ChessboardContainer>{renderChessboard()}</ChessboardContainer>;
};

export default ChessBoard;
