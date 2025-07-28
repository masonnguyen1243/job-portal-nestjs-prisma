import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

    const result = await this.companyService.getCompanies(userId);

    return {
      success: true,
      result,
    };
  }

  // get company by id
  @Get(':id')
  async getCompanyByid(@Param('id') companyId: string) {
    const company = await this.companyService.getCompanyById(companyId);
    return {
      success: true,
      company,
    };
  }

  // delete company
  @Delete(':id')
  async deleteCompany(@Param('id') companyId: string) {
    const result = await this.companyService.deleteCompany(companyId);
    return {
      result,
      success: true,
      message: 'Company deleted successfylly',
    };
  }
}
