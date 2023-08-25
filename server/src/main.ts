// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv'; 
async function bootstrap() {
  dotenv.config(); 
  const app = await NestFactory.create(AppModule, { cors: true });

  const corsOptions: CorsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  };
  // app.enableCors(corsOptions);
  app.enableCors();
  
  await app.listen(8000);
}
bootstrap();

