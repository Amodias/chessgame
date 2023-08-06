// users/user.controller.ts

import { Controller, Get, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';



@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return  user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
}
