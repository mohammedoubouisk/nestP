import { FluxSortantEntity } from './../flux/flux.entity';
import { FluxEmpruntEntity } from './../flux_emprunt/flux_emprunt.entity';
import { ArchiveEntit } from './../archive/archive.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';


@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(ArchiveEntit)
    private archiveRepository: Repository<ArchiveEntit>,
    @InjectRepository(FluxEmpruntEntity)
    private fluxEmpruntRepository: Repository<FluxEmpruntEntity>,
    @InjectRepository(FluxSortantEntity)
    private fluxSortantRepository: Repository<FluxSortantEntity>,
  ) {}

  async getUsageStats() {

    const archivesPhysiques = await this.archiveRepository
    .createQueryBuilder('archive')
    .where("JSON_EXTRACT(archive.location, '$.site') IS NOT NULL")
    .getCount();

    // her we get total
    const [totalArchives, archivesNumeriques] = await Promise.all([
      // Total number of archives
      this.archiveRepository.count(),
      // here we get numerique
      this.archiveRepository.count({
        where: {
          file_url: Not(IsNull())
        }
      })
    ]);

    // Get number of emprunts
    const emprunts = await this.fluxEmpruntRepository.count();

    // Get number of flux sortants
    const fluxSortants = await this.fluxSortantRepository.count();
                                                

    return {

      total_archives: totalArchives,
      archives_physiques: archivesPhysiques,
      archives_numeriques: archivesNumeriques,
      emprunts: emprunts,
      flux_sortants: fluxSortants
    };
  }
}