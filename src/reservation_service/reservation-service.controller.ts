import { ReservationQueryDto } from './dto/ReservationService.dto';
import { ReservationService } from './reservation-service.service';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';


@Controller('archives')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('reservations')
  async getReservations(@Query()query: ReservationQueryDto) {
    const reservations = await this.reservationService.findAll(query);
    
    // Transform the response to match the expected format
    return reservations.map(reservation => ({
      reservation_id: reservation.reservation_id,
      archive_id: reservation.archive_id,
      employe: reservation.employe,
      date_debut: reservation.date_debut.toISOString(),
      date_fin: reservation.date_fin.toISOString()
    }));
  }
}