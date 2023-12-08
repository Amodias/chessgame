import socketService from "./socketServices";

const subscribeToPawnMove = (handlePawnMove) => {
  socketService.onPawnMove(handlePawnMove);
};

const unsubscribeFromPawnMove = () => {
  socketService.offPawnMove();
};

const emitPawnMove = (fen, from, to) => {
  socketService.emitPawnMove(fen, from, to);
};

export { subscribeToPawnMove, unsubscribeFromPawnMove, emitPawnMove };
