import { ReservationService } from './../reservation_service/reservation-service.service';
import { Test, TestingModule } from '@nestjs/testing';


describe('ReservationService', () => {
  let controller: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationService],
    }).compile();

    controller = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
