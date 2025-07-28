import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/prisma.service';
import { UsersModule } from '@/users/users.module';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { CompanyModule } from '@/company/company.module';
import { JobModule } from '@/job/job.module';
import { ApplicationModule } from '@/application/application.module';
import { ApplicationService } from '@/application/application.service';

@Module({
  imports: [
    UsersModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, ApplicationService, PrismaService],
})
export class AppModule {}
