import { ArchiveEntit } from './../archive/archive.entity';
import { FluxSortantEntity } from './flux.entity';
import { FluxSortantService } from './flux.service';
import { FluxSortantController } from './flux.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FluxSortantEntity, ArchiveEntit])],
  controllers: [FluxSortantController],
  providers: [FluxSortantService],
})
export class FluxSortantModule {}