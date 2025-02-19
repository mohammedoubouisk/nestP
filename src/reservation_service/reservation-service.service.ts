import { ReservationQueryDto } from './../reservation_service/dto/ReservationService.dto';
import { ReservationEntity } from './../reservation_service/reservation-service.entity'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';


@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async findAll(query: ReservationQueryDto): Promise<ReservationEntity[]> {
    const whereClause: any = {};

  //query hya param search 
    if (query.utilisateur_id) {
      whereClause.employe = query.utilisateur_id;     //we don't have id that why i am using search by name 
    }

    // filtring by date
    if (query.date_debut && query.date_fin) {
      const startDate = new Date(query.date_debut);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(query.date_fin);
      endDate.setHours(23, 59, 59, 999);
      
      whereClause.date_debut = Between(startDate, endDate);
      
    } else if (query.date_debut) {
      const startDate = new Date(query.date_debut);
      startDate.setHours(0, 0, 0, 0);
      whereClause.date_debut = MoreThanOrEqual(startDate);
    } else if (query.date_fin) {
      const endDate = new Date(query.date_fin);
      endDate.setHours(23, 59, 59, 999);
      whereClause.date_fin = LessThanOrEqual(endDate);
    }

    return this.reservationRepository.find({
      where: whereClause,
      relations: ['archive'],
      order: {
        date_debut: 'DESC',
      },
    });
  }

  // alors this nnot obligation  because werClause do everything

  async findByEmployee(employeeName: string): Promise<ReservationEntity[]> {
    return this.reservationRepository.find({
      where: { employe: employeeName },
      relations: ['archive'],
      order: {
        date_debut: 'DESC',
      },
    });
  }

  async findByArchiveId(archiveId: string): Promise<ReservationEntity[]> {
    return this.reservationRepository.find({
      where: { archive_id: archiveId },
      relations: ['archive'],
      order: {
        date_debut: 'DESC',
      },
    });
  }
}