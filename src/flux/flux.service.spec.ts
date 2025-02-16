import { Test, TestingModule } from '@nestjs/testing';
import { FluxSortantService } from './flux.service';

describe('FluxService', () => {
  let service: FluxSortantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FluxSortantService],
    }).compile();

    service = module.get<FluxSortantService>(FluxSortantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
