import { Controller } from '@nestjs/common';
import { CompanyService } from '@/company/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
}
