import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server , Socket  } from 'socket.io';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket) {
    // Your logic to handle players joining the room goes here
    console.log('success socket');
    
  }
}
