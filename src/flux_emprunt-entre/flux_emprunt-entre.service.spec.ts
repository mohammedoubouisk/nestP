import { Test, TestingModule } from '@nestjs/testing';
import { FluxRetourService } from './flux_emprunt-entre.service';

describe('FluxRetourService', () => {
  let service: FluxRetourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FluxRetourService],
    }).compile();

    service = module.get<FluxRetourService>(FluxRetourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
