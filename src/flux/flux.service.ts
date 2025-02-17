import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FluxSortantEntity } from './flux.entity';
import { CreateFluxSortantDto } from './dto/fluxSortant.dto';
import { ArchiveEntit } from 'src/archive/archive.entity';

@Injectable()
export class FluxSortantService {
  constructor(
    @InjectRepository(FluxSortantEntity)
    private fluxSortantRepository: Repository<FluxSortantEntity>,
    @InjectRepository(ArchiveEntit)
    private archiveRepository: Repository<ArchiveEntit>,
  ) {}

  async create(createFluxSortantDto: CreateFluxSortantDto): Promise<{ id: string; message: string }> {
    const archive = await this.archiveRepository.findOne({ where: { id: createFluxSortantDto.archive_id } });
    if (!archive) {
      throw new NotFoundException(`Archive with ID ${createFluxSortantDto.archive_id} not found`);
    }                                   
    const fluxSortant = new FluxSortantEntity();
    fluxSortant.archive_id = createFluxSortantDto.archive_id;
    fluxSortant.date_sortie = new Date(createFluxSortantDto.date_sortie);
    fluxSortant.site_destination = createFluxSortantDto.site_destination;

    const savedFlux = await this.fluxSortantRepository.save(fluxSortant);

    return {
      id: savedFlux.id,
      message: 'Flux sortant enregistré avec succès.',
    };
  }
}