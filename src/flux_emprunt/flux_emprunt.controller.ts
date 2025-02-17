import { FluxEmpruntService } from './flux_emprunt.service';
import { CreateFluxEmpruntDto } from './dto/flux_emprunt.dto';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';


@Controller('flux')
export class FluxEmpruntController {
  constructor(private readonly fluxEmpruntService: FluxEmpruntService) {}

  @Post('sortant_emprunt')
  async createFluxEmprunt(@Body(new ValidationPipe()) createFluxEmpruntDto: CreateFluxEmpruntDto) {
    return this.fluxEmpruntService.create(createFluxEmpruntDto);
  }
}