
export const movePawn = (chess, from, to) => {
    console.log(chess);
    const move = chess.move({ from, to });
    if (move) {
      console.log('Valid move');
    } else {
      console.log('Invalid move');
    }
  };