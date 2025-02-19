import { StatsService } from './statistique-utilisateur.service';
import { Controller, Get } from '@nestjs/common';


@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('usage')
  async getUsageStats() {
    return this.statsService.getUsageStats();
  }
}