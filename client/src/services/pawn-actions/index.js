
export const movePawn = (chess, from, to) => {
    convertNotationToPosition(to);
    const move = chess.move({ from, to });
    // console.log(move , chess);
    return move;
  };

 export const getPossibleMoves = (chess, from ) => {
    let possibleMoves = chess.moves({ square: from });
    possibleMoves = convertNotationToPosition(possibleMoves);
    return possibleMoves ;

  };
  const convertNotationToPosition = (notation) => {
    if (Array.isArray(notation)) {
      return notation.map((n) => (n.length >= 2 ? n.substring(n.length - 2).toLowerCase() : n.toLowerCase()));
    } else if (notation.length >= 2) {
      return notation.substring(notation.length - 2).toLowerCase();
    }
    return notation.toLowerCase();
  };
  
  
  