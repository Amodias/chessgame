export async function getStockfishFen(FEN_POSITION) {
  const bestMove = await new Promise((resolve) => {
    const stockfish = new Worker("./stockfish.js");
    const DEPTH = 8; // number of halfmoves the engine looks ahead

    stockfish.onmessage = (e) => {
      // Check if the message is the best move and extract 'from' and 'to' squares
      if (e.data.startsWith("bestmove")) {
        const bestMove = e.data.split(" ")[1]; // Extracting the best move
        const fromSquare = bestMove.slice(0, 2); // Extracting 'from' square
        const toSquare = bestMove.slice(2, 4); // Extracting 'to' square
        resolve({ from: fromSquare, to: toSquare });
        stockfish.terminate(); // Terminate the worker after getting the best move
      }
    };

    // Send commands to Stockfish
    stockfish.postMessage("uci");
    stockfish.postMessage(`position fen ${FEN_POSITION}`);
    stockfish.postMessage(`go depth ${DEPTH}`);
  });

  return bestMove;
}
