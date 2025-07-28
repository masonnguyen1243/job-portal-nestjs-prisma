import { Module } from '@nestjs/common';
import { ApplicationService } from '@/application/application.service';
import { ApplicationController } from '@/application/application.controller';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
