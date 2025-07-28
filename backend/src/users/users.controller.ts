import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { RegisterUserDto } from '@/users/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }
}
