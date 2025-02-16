import { CreateFluxSortantDto } from './dto/fluxSortant.dto';
import { FluxSortantService } from './flux.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

@Controller('sortant_site')
export class FluxSortantController {
  constructor(private readonly fluxSortantService: FluxSortantService) {}

  @Post('ajouter')
  async createFluxSortant(@Body() createFluxSortantDto: CreateFluxSortantDto) {
    return this.fluxSortantService.create(createFluxSortantDto);
  }
}