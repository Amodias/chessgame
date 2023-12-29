import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  Headers,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    try {
      return this.authService.signIn(signInDto.username, signInDto.password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('verify-token')
  async verifyToken(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<any> {
    const token = this.extractTokenFromAuthorizationHeader(authorizationHeader);

    return this.authService.verifyToken(token);
  }

  private extractTokenFromAuthorizationHeader(
    authorizationHeader: string,
  ): string | null {
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.substring(7);
    }
    return null;
  }
}
