import { Test, TestingModule } from '@nestjs/testing';
import { FluxEmpruntService } from './flux_emprunt.service';

describe('FluxEmpruntService', () => {
  let service: FluxEmpruntService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FluxEmpruntService],
    }).compile();

    service = module.get<FluxEmpruntService>(FluxEmpruntService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
