import { PrismaService } from '@/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, UpdateUserDto } from '@/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      profileBio,
      profileSkill,
      profileResume,
      profileResumeOriginalName,
      profilePhoto,
      role,
    } = registerUserDto;

    if (!fullName || !email || !phoneNumber || !password) {
      throw new BadRequestException('Required fields are missing');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        profileBio,
        profileSkill,
        profileResume,
        profileResumeOriginalName,
        profilePhoto,
        role,
      },
    });

    if (!user) {
      throw new BadRequestException('User registration failed');
    }

    return { user, success: true, message: 'User registered successfully' };
  }

  async login(email: string, password: string, role: string) {
    if (!email || !password || !role) {
      throw new BadRequestException('All fields are required');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not exist');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    if (role !== user.role) {
      throw new BadRequestException('Role mismatch');
    }

    const token = this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    return { success: true, message: 'Login successful', user, token };
  }

  async logout(): Promise<{ message: string; success: boolean }> {
    return { message: 'User logged out successfully', success: true };
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    const {
      fullName,
      email,
      phoneNumber,
      profileBio,
      profileSkill,
      profileResume,
      profileResumeOriginalName,
      profilePhoto,
    } = updateUserDto;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !profileBio ||
      !profileSkill ||
      !profileResume ||
      !profileResumeOriginalName ||
      !profilePhoto
    ) {
      throw new BadRequestException('Required fields are missing');
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        fullName,
        email,
        phoneNumber,
        profileBio,
        profileSkill,
        profileResume,
        profileResumeOriginalName,
        profilePhoto,
      },
    });

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }
  }

  async profile(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
