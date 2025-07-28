import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { RegisterUserDto, UpdateUserDto } from '@/users/dto/user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

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

      res.cookie('accessToken', userResponse?.token, {
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

  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      const result = await this.usersService.logout();

      res.clearCookie('accessToken');

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        success: false,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  async updateProfile(
    @Req() req: any,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const userId = req.user.id;

      const user = await this.usersService.updateProfile(userId, updateUserDto);

      return res.status(200).json({
        message: 'Profile updated successfully',
        success: true,
        user,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        success: false,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      console.log(id);

      await this.usersService.deleteUser(id);

      return res.status(200).json({
        success: true,
        message: `User with ID ${id} deleted successfully`,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        success: false,
      });
    }
  }
}
