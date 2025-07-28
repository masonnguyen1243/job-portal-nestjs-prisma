import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { RegisterUserDto } from '@/users/dto/user.dto';
import dayjs from 'dayjs';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const { email, password, role } = body;
    try {
      const userResponse = await this.usersService.login(email, password, role);

      res.cookie('token', userResponse?.token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: 'strict',
      });

      return res.status(200).json(userResponse);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        success: false,
      });
    }
  }
}
