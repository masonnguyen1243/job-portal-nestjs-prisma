import { Module } from '@nestjs/common';
import { CompanyService } from '@/company/company.service';
import { CompanyController } from '@/company/company.controller';
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
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
