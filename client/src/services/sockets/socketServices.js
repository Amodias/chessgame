import io from 'socket.io-client';

const socketService = {
  socket: io('http://127.0.0.1:8000', {
    transports: ['websocket']
  }),

  connect() {
    this.socket.connect();
  },

  disconnect() {
    this.socket.disconnect();
  },
  checkRoom() {
    return new Promise((resolve) => {
      this.socket.on('MultiPlayerRoomCreated', (roomId) => {
        this.socket.room = roomId ;
        resolve(true);
      });
    });
  },
  isConnected() {
    return this.socket.connected;
  },
  emitPawnMove(chessState , selectedPosition ,to){
      this.socket.emit("emit-pawn-move" , {roomId : this.socket.room , chessState : chessState ,selectedPosition : selectedPosition , to : to })
  },
  onPawnMove(callback) {
    this.socket.on('on-pawn-move', ({chessState  ,selectedPosition, to}) => {

      console.log(chessState,  selectedPosition, to);
      callback(chessState,  selectedPosition, to);
    });
  },
  offPawnMove(){
   return  this.socket.off('on-pawn-move') ;
  }
};

export default socketService;
