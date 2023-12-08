import React, { useState, useEffect, FC } from "react";
import { ChessboardRow, ChessboardContainer, ChessboardSquare } from "./styles";
import { initilaeState } from "./intiale-state";
import { Chess } from "chess.js";
import {
  movePawn,
  getPossibleMoves,
  mirrorFEN,
} from "../../services/pawn-actions";
import socketService from "../../services/sockets/socketServices";
import Pawn from "../pawns/pawn";
import Knight from "../pawns/knight";
import Bishop from "../pawns/bishop";
import King from "../pawns/king";
import Queen from "../pawns/queen";
import Rook from "../pawns/rook";

const ChessBoard = ({
  selectedPosition,
  setSelectedPosition,
  possibleMoves,
  setPossibleMoves,
  multiplayer,
}) => {
  const [chess, setChess] = useState(new Chess());

  const [receivedPosition, setReceivedPosition] = useState({});
  const [pawnComponents, setPawnComponents] = useState(initilaeState);

  const movePawnComponent = (from, to) => {
    const updatedPawnComponents = { ...pawnComponents };
    const pawnComponent = updatedPawnComponents[from];
    delete updatedPawnComponents[from];
    updatedPawnComponents[to] = pawnComponent;
    setPawnComponents(updatedPawnComponents);
  };

  useEffect(() => {
    if (multiplayer) {
      const handlePawnMove = (chessState, selectedPosition, to) => {
        setReceivedPosition({ from: selectedPosition, to: to });
        setChess(new Chess(chessState));
      };
      socketService.onPawnMove(handlePawnMove);
      return () => {
        socketService.offPawnMove();
      };
    }
  }, []);

  const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

  useEffect(() => {
    rows.forEach((row, rowIndex) =>
      columns.forEach((column, columnIndex) => {
        let position = `${column}${row}`;
        const piece = chess.get(position);
        const component = () => {
          if (piece.type === "r") return Rook;
          if (piece.type === "k") return King;
          if (piece.type === "b") return Bishop;
          if (piece.type === "q") return Queen;
          if (piece.type === "p") return Pawn;
          if (piece.type === "n") return Knight;
        };
        setPawnComponents((prevState) => ({
          ...prevState,
          [position]: {
            ...prevState[position],
            ...{
              component: component(),
              type: piece.type,
              color: piece.color === "b" ? "black" : "white",
            },
          },
        }));
      })
    );
  }, [chess]);

  const renderChessboard = () => {
    const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
    const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

    const handleMove = (to, multiplayer) => {
      if (selectedPosition && possibleMoves.includes(to)) {
        movePawnComponent(selectedPosition, to);
        const { chessState } = movePawn(chess, selectedPosition, to);
        setChess(chessState);
        multiplayer ??
          socketService.emitPawnMove(
            mirrorFEN(chess.fen()),
            selectedPosition,
            to
          );
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
          const piece = chess.get(position);
          const handleSquareClick = () => {
            if (
              (selectedPosition === position &&
                piece.color === "w" &&
                multiplayer) ||
              (!multiplayer && selectedPosition === position)
            ) {
              setSelectedPosition(null);
              setPossibleMoves([]);
            } else if (selectedPosition && possibleMoves.includes(position)) {
              handleMove(position);
            } else if ((piece.color === "w" && multiplayer) || !multiplayer) {
              setSelectedPosition(position);
              setPossibleMoves(getPossibleMoves(chess, position));
            }
          };

          return (
            <ChessboardSquare
              key={column + row}
              sx={{
                backgroundColor:
                  (rowIndex + columnIndex) % 2 === 0
                    ? "rgba(255, 255, 255, 0.75)"
                    : "rgba(84, 84, 84, 0.75)",
                opacity: possibleMoves.includes(position) ? 0.5 : 1,
                cursor: selectedPosition ? "pointer" : "default",
              }}
              onClick={handleSquareClick}
            >
              {PawnComponent && (
                <PawnComponent
                  type={pawnComponent.type}
                  color={pawnComponent.color}
                />
              )}
            </ChessboardSquare>
          );
        })}
      </ChessboardRow>
    ));
  };

  return <ChessboardContainer>{renderChessboard()}</ChessboardContainer>;
};

export default ChessBoard;
