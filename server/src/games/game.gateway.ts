import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedSockets: Set<Socket> = new Set();
  pairedSockets: Socket[][] = [];
  constructor() {
    setInterval(this.checkRoomsAndEmitEvents.bind(this), 500);
  }

  handleConnection(client: Socket) {
    if (!this.connectedSockets.has(client)) {
      this.connectedSockets.add(client);
    }
    Socket;
  }

  private checkRoomsAndEmitEvents() {
    let currentSocket = [];
    if (this.connectedSockets.size >= 2) {
      const socketsList = Array.from(this.connectedSockets);
      socketsList.forEach((socket) => {
        currentSocket.push(socket);
        const paired = this.pairedSockets.some((pair) => pair.includes(socket));
        if (!paired && currentSocket.length === 2) {
          this.pairedSockets.push(currentSocket);
          currentSocket = [];
        }
      });
      this.pairedSockets.forEach((pairedSocket) => {
        const roomId = pairedSocket.map((socket) => socket.id).join('-');
        pairedSocket.forEach((socket) => {
          socket.join(roomId);
          socket.emit('MultiPlayerRoomCreated', roomId);
        });
      });
    }
  }

  @SubscribeMessage('emit-pawn-move')
  handlePawnMove(client: Socket, { roomId, chessState, selectedPosition, to }) {
    client
      .to(roomId)
      .emit('on-pawn-move', { chessState, selectedPosition, to });
  }

  handleDisconnect(client: Socket) {
    this.connectedSockets.delete(client);
  }
}
