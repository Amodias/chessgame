export async function getStockfishFen(FEN_POSITION) {
  const bestMove = await new Promise((resolve) => {
    const stockfish = new Worker("./stockfish.js");
    const DEPTH = 8;

    stockfish.onmessage = (e) => {
      if (e.data.startsWith("bestmove")) {
        const bestMove = e.data.split(" ")[1];
        const fromSquare = bestMove.slice(0, 2);
        const toSquare = bestMove.slice(2, 4);
        resolve({ from: fromSquare, to: toSquare });
        stockfish.terminate();
      }
    };

    stockfish.postMessage("uci");
    stockfish.postMessage(`position fen ${FEN_POSITION}`);
    stockfish.postMessage(`go depth ${DEPTH}`);
  });

  return bestMove;
}
