import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApplicationService } from '@/application/application.service';
import { UpdateStatusDto } from '@/application/dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post(':id')
  async applyJob(@Req() req: any, @Param('id') jobId: string) {
    const userid = req.user.id;
    const application = await this.applicationService.applyJob(userid, jobId);

    return { message: 'Job Applied successfully', application, success: true };
  }

  @Get()
  async getAppliedJobs(@Req() req: any) {
    const userId = req.user.id;
    const applications = await this.applicationService.getAppliedJobs(userId);
    return { applications, success: true };
  }

  @Get(':id')
  async getApplicants(@Param('id') jobId: string) {
    const job = await this.applicationService.getApplicants(jobId);
    return { job, success: true };
  }

  @Put('update-status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const updatedApplication = await this.applicationService.updateStatus(
      id,
      updateStatusDto,
    );

    return {
      message: 'Status updated successfully',
      updatedApplication,
      success: true,
    };
  }
}
