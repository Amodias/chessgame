
export const movePawn = (chess, from, to) => {
    console.log(chess);
    convertNotationToPosition(to);
    const move = chess.move({ from, to });
    if (move) {
      console.log('Valid move');
      
    } else {
      console.log('Invalid move');
    }
    return move;
  };

 export const getPossibleMoves = (chess, from ) => {
    let possibleMoves = chess.moves({ square: from });
    console.log(`Possible moves for :`, possibleMoves);
    possibleMoves = convertNotationToPosition(possibleMoves);
    console.log(`Possible moves for :`, possibleMoves);
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
  
  
  