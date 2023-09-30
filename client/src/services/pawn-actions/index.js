export const movePawn = (chess, from, to) => {
  convertNotationToPosition(to);
  const move = chess.move({ from, to });
  const chessState = chess;
  return { move, chessState };
};

export const getPossibleMoves = (chess, from) => {
  let possibleMoves = chess.moves({ square: from });
  possibleMoves = convertNotationToPosition(possibleMoves);
  return possibleMoves;
};
const convertNotationToPosition = (notation) => {
  if (Array.isArray(notation)) {
    return notation.map((n) =>
      n.length >= 2 ? n.substring(n.length - 2).toLowerCase() : n.toLowerCase()
    );
  } else if (notation.length >= 2) {
    return notation.substring(notation.length - 2).toLowerCase();
  }
  return notation.toLowerCase();
};

export const mirrorFEN = (fen) => {
  const [board, turn, castling, enPassant, halfMoveClock, fullMoveNumber] =
    fen.split(" ");

  const pieceMap = {
    P: "p",
    N: "n",
    B: "b",
    R: "r",
    Q: "q",
    K: "k",
    p: "P",
    n: "N",
    b: "B",
    r: "R",
    q: "Q",
    k: "K",
  };

  const mirroredBoard = board
    .split("/")
    .map((row) =>
      row
        .split("")
        .map((square) => (pieceMap[square] ? pieceMap[square] : square))
        .join("")
    )
    .reverse()
    .join("/");

  const mirroredFEN = `${mirroredBoard} ${
    turn === "w" ? "b" : "w"
  } ${castling} ${enPassant} ${halfMoveClock} ${fullMoveNumber}`;

  return mirroredFEN;
};
