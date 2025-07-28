import { Module } from '@nestjs/common';
import { JobService } from '@/job/job.service';
import { JobController } from '@/job/job.controller';
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
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
