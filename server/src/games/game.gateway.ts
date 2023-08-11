import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Socket  ,Server} from 'socket.io';

@WebSocketGateway()
export class GameGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocketGateway initialized');
  }
  
  handleConnection(client: Socket) {
      console.log(`Client ${client.id} connected`);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket) {
    console.log('Received joinRoom event from client:', client.id);
    this.server.to(client.id).emit('startGame', { roomId: 'yourRoomId', player: 'yourPlayer' });
  }
}
