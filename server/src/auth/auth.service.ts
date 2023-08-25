import { Injectable, UnauthorizedException , HttpException , HttpStatus} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    const token =  await this.jwtService.signAsync(payload) ;
    return { user, access_token: token };
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      const payload = { sub: user._id, username: user.username };
      const token = this.jwtService.sign(payload); 
      return { user, access_token: token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyToken(token) {
    try {

      const decoded = this.jwtService.verify(  token); 
      const { sub: userId,  username } = decoded;
      return { isValid: true,  username };
    } catch (error) {
      return { isValid: false, token : token , error: error.message };
    }
  }

}