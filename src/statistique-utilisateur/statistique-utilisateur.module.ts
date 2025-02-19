import { ArchiveEntit } from './../archive/archive.entity';
import { StatsService } from './statistique-utilisateur.service';
import { StatsController } from './statistique-utilisateur.controller';
import { FluxEmpruntEntity } from './../flux_emprunt/flux_emprunt.entity';
import { FluxSortantEntity } from './../flux/flux.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArchiveEntit,
      FluxEmpruntEntity,
      FluxSortantEntity
    ])
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}