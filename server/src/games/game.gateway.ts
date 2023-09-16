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

  pairedSockets: Set<Socket> = new Set();
  constructor() {
    setInterval(this.checkRoomsAndEmitEvents.bind(this), 500);
  }

  handleConnection(client: Socket) {
    if (!this.pairedSockets.has(client)) {
      this.pairedSockets.add(client);
    }
    Socket;
  }

  private checkRoomsAndEmitEvents() {
    if (this.pairedSockets.size >= 2) {
      const pair = Array.from(this.pairedSockets);
      const roomId = pair.map((socket) => socket.id).join('-');
      pair.forEach((socket) => {
        socket.join(roomId);
        socket.emit('MultiPlayerRoomCreated', roomId);
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
    this.pairedSockets.delete(client);
  }
}
