import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from '@/company/company.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RegisterCompanyDto } from '@/company/dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async registerCompany(
    @Body() registerCompanyDto: RegisterCompanyDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const result = await this.companyService.registerCompany(
      userId,
      registerCompanyDto,
    );

    return {
      message: 'Company registered successfully',
      succcess: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCompanies(@Req() req: any) {
    const userId = req.user.id;
    console.log('🚀 ~ CompanyController ~ getCompanies ~ userId:', userId);

    const result = await this.companyService.getCompanies(userId);

    return {
      success: true,
      result,
    };
  }
}
