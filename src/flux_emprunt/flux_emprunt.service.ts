import { ArchiveEntit } from './../archive/archive.entity';
import { CreateFluxEmpruntDto } from './dto/flux_emprunt.dto';
import { FluxEmpruntEntity } from './flux_emprunt.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FluxEmpruntService {
  constructor(
    @InjectRepository(FluxEmpruntEntity)
    private fluxEmpruntRepository: Repository<FluxEmpruntEntity>,
    @InjectRepository(ArchiveEntit)
    private archiveRepository: Repository<ArchiveEntit>,
  ) {}

  async create(createFluxEmpruntDto: CreateFluxEmpruntDto): Promise<{ id: number; message: string }> {
    const archive = await this.archiveRepository.findOne({ where: { id: createFluxEmpruntDto.archive_id } });
    if (!archive) {
      throw new NotFoundException(`Archive with ID ${createFluxEmpruntDto.archive_id} not found`);
    }

    const fluxEmprunt = new FluxEmpruntEntity();
    fluxEmprunt.archive_id = createFluxEmpruntDto.archive_id;
    fluxEmprunt.date_sortie = new Date(createFluxEmpruntDto.date_sortie);
    fluxEmprunt.employe = createFluxEmpruntDto.employe;

    const savedFlux = await this.fluxEmpruntRepository.save(fluxEmprunt);

    return {
      id: savedFlux.id,
      message: 'Emprunte enregistré avec succès.',
    };
  }
}