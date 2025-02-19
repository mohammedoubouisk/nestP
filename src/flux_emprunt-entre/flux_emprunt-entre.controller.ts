import { CreateFluxRetourDto } from './dto/FluxRoteurDto.dto';
import { FluxRetourService } from './flux_emprunt-entre.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';


@Controller('flux')
export class FluxRetourController {
  constructor(private readonly fluxRetourService: FluxRetourService) {}

  @Post('entrant_emprunt')
  async createFluxRetour(
    @Body() 
    createFluxRetourDto: CreateFluxRetourDto
  ) {
    return this.fluxRetourService.create(createFluxRetourDto);
  }
}