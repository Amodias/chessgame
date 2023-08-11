import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  pairedSockets: Set<Socket> = new Set(); // Keep track of paired sockets

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    if (!this.pairedSockets.has(client)) {
      this.pairedSockets.add(client);

      if (this.pairedSockets.size >= 2) {
        const pair = Array.from(this.pairedSockets);
        this.pairedSockets.clear();

        const roomId = pair.map(socket => socket.id).join('-');
        pair.forEach(socket => {
          socket.join(roomId);
          console.log(roomId);
          socket.emit('GameSetted', { roomId });
        });
      }
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.pairedSockets.delete(client);
  }
}
