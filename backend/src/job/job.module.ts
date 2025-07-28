import { Module } from '@nestjs/common';
import { JobService } from '@/job/job.service';
import { JobController } from '@/job/job.controller';

@Module({
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
