import React from 'react';
import { ChessboardRow ,ChessboardContainer ,ChessboardSquare } from './styles';
import Pawn from '../pawns/pawn';
const ChessBoard = () => {
  const renderChessboard = () => {
    const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    return rows.map((row, rowIndex) => (
      <ChessboardRow key={row}>
        {columns.map((column, columnIndex) => (
          <ChessboardSquare
            key={column + row}
            sx={{
              backgroundColor:
                (rowIndex + columnIndex) % 2 === 0 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(84, 84, 84, 0.75)',
            }}
          >
            {`${column}${row}`}
            
          </ChessboardSquare>
        ))}
      </ChessboardRow>
    ));
  };

  return <ChessboardContainer>{renderChessboard()}</ChessboardContainer>;
};

export default ChessBoard;
