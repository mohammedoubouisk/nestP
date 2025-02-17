import { FluxEmpruntService } from './flux_emprunt.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FluxEmpruntController } from './flux_emprunt.controller';
import { FluxEmpruntEntity } from './flux_emprunt.entity';
import { ArchiveEntit } from 'src/archive/archive.entity';
import { FluxSortantEntity } from 'src/flux/flux.entity';
import { FluxSortantController } from 'src/flux/flux.controller';
import { FluxSortantService } from 'src/flux/flux.service';

@Module({
  imports: [TypeOrmModule.forFeature([FluxSortantEntity, FluxEmpruntEntity, ArchiveEntit])],
  controllers: [FluxSortantController, FluxEmpruntController],
  providers: [FluxSortantService, FluxEmpruntService]
})
export class FluxEmpruntModule {

}