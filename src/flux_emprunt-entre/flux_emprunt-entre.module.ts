import { ArchiveEntit } from './../archive/archive.entity';
import { FluxRetourEntity } from './flux_emprunt-entre.entity';
import { FluxRetourService } from './flux_emprunt-entre.service';
import { FluxRetourController } from './flux_emprunt-entre.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([FluxRetourEntity, ArchiveEntit])],
  controllers: [FluxRetourController],
  providers: [FluxRetourService],
})
export class FluxRetourModule {}