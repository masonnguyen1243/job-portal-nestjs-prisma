import { Module } from '@nestjs/common';
import { ApplicationService } from '@/application/application.service';
import { ApplicationController } from '@/application/application.controller';
import { PrismaModule } from '@/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      },
    }),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
