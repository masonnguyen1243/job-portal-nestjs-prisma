import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { JobService } from '@/job/job.service';
import { PostJobDto } from '@/job/dto/job.dto';
import { Public } from '@/decorators/customize';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async postJob(@Req() req: any, @Body() postJobDto: PostJobDto) {
    const userId = req.user.id;
    const job = await this.jobService.postJob(userId, postJobDto);

    return { job, message: 'Job created successfully', success: true };
  }

  // get all jobs
  @Get()
  @Public()
  async getAllJobs(@Query() query: string) {
    const jobs = await this.jobService.getAllJobs(query);
    return { jobs, success: true };
  }

  // get job by id
  @Get(':id')
  @Public()
  async getJobByid(@Param('id') jobId: string) {
    const job = await this.jobService.getJobById(jobId);
    return { job, success: true };
  }

  // get jobs by userid
  @Post('admin')
  async getJobByUserId(@Req() req: any) {
    const userId = req.user.id;
    const jobs = await this.jobService.getJobByUserId(userId);
    return { jobs, success: true };
  }

  // create favorite
  @Post('favorite/:id')
  async createFavorite(@Req() req, @Param('id') jobId: string) {
    const userId = req.user.id;
    const result = await this.jobService.createFavorite(jobId, userId);
    return { result, success: true };
  }

  @Post('favorites')
  async getFavorites(@Req() req) {
    const userId = req.user.id;
    const result = await this.jobService.getFavorites(userId);
    return { result, success: true };
  }

  // delete company
  @Delete(':id')
  async deleteJob(@Param('id') jobId: string) {
    const result = await this.jobService.deleteJob(jobId);
    return {
      result,
      success: true,
      message: 'Company deleted successfylly',
    };
  }
}
