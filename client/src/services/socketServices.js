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
  emitPawnMove(chessState){
      this.socket.emit("emit-pawn-move" , {roomId : this.socket.room , chessState : chessState})
  },
  onPawnMove(){
      this.socket.on('on-pawn-move', (chessState) => {
        return(chessState);
    });
  }
};

export default socketService;
