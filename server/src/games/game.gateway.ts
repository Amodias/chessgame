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

  pairedSockets: Set<Socket> = new Set(); // Keep track of paired sockets

  constructor() {
    // Start a timer to periodically check for rooms and emit events
    setInterval(this.checkRoomsAndEmitEvents.bind(this), 500); // Adjust the interval as needed
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
      // this.pairedSockets.clear();
      const roomId = pair.map((socket) => socket.id).join('-');
      pair.forEach((socket) => {
        socket.join(roomId);
        socket.emit('LoadingStateChanged');
      });
    }
  }
  handleDisconnect(client: Socket) {
    this.pairedSockets.delete(client);
  }
}
