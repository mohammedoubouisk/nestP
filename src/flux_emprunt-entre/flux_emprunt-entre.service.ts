import { FluxRetourEntity } from './flux_emprunt-entre.entity';
import { ArchiveEntit } from './../archive/archive.entity';
import { CreateFluxRetourDto } from './dto/FluxRoteurDto.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FluxRetourService {
  constructor(
    @InjectRepository(FluxRetourEntity)
    private fluxRetourRepository: Repository<FluxRetourEntity>,
    @InjectRepository(ArchiveEntit)
    private archiveRepository: Repository<ArchiveEntit>,
  ) {}

  async create(createFluxRetourDto: CreateFluxRetourDto): Promise<{ id: number; message: string }> {

    // her we check if the archive existe
    const archive = await this.archiveRepository.findOne({ 
      where: { id: createFluxRetourDto.archive_id } 
    });
    
    if (!archive) {
      throw new NotFoundException(`Archive with ID ${createFluxRetourDto.archive_id} not found`);
    }

    // create new flux retour
    const fluxRetour = new FluxRetourEntity();
    fluxRetour.archive_id = createFluxRetourDto.archive_id;
    fluxRetour.date_retoure = new Date(createFluxRetourDto.date_retoure);
    fluxRetour.employe = createFluxRetourDto.employe;

    const savedFlux = await this.fluxRetourRepository.save(fluxRetour);

    return {
      id: savedFlux.id,
      message: 'Retour enregistré avec succès.'
    };
  }
}