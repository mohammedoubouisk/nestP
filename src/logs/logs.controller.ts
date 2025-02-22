import { AuditAction } from './logs.entity';
import { LogsService } from './logs.service';
import { UserType } from 'src/utils/enum';
import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
// import { JwtAuthGuard } from '../logs/AuthGuards/authguard.guard';
// import { RolesGuard } from '../logs/AuthGuards/RolesGuards.guard';
import { Roles } from '../decorator/roles.decorator';
import { JwtAuthGuard } from 'src/AuthGuards/authguard.guard';


@Controller('audit')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: LogsService) {}

  @Get('logs')
  @UseGuards(JwtAuthGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  async getLogs() {
    return await this.auditService.GetLogsAll()
  }
}