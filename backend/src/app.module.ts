import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma.service';
import { UsersModule } from '@/users/users.module';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { CompanyModule } from '@/company/company.module';
import { JobModule } from '@/job/job.module';
import { ApplicationModule } from '@/application/application.module';
import { ApplicationService } from '@/application/application.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UsersService,
    JwtStrategy,
    ApplicationService,
    PrismaService,
  ],
})
export class AppModule {}
