import { ReservationEntity } from './../reservation_service/reservation-service.entity';
import { ReservationController } from './reservation-service.controller';
import { ReservationService } from './reservation-service.service';
import { ArchiveEntit } from '../archive/archive.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity, ArchiveEntit])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}