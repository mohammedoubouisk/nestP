import { CreateFluxSortantDto } from './dto/fluxSortant.dto';
import { FluxSortantService } from './flux.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('flux')
export class FluxSortantController {
  constructor(private readonly fluxSortantService: FluxSortantService) {}

  @Post('sortant_site')
  async createFluxSortant(@Body() createFluxSortantDto: CreateFluxSortantDto) {
    return this.fluxSortantService.create(createFluxSortantDto);
  }
}