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
  }
};

export default socketService;
