import { PrismaService } from '@/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService,
  ) {
    // Lấy JWT_SECRET từ ConfigService
    const jwtSecret = configService.get<string>('JWT_SECRET');

    // **QUAN TRỌNG:** Kiểm tra xem JWT_SECRET có tồn tại không.
    // Nếu không, hãy ném lỗi để ngăn ứng dụng khởi động với cấu hình sai.
    if (!jwtSecret) {
      throw new Error(
        'JWT_SECRET is not defined in the environment variables. Please set it.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
