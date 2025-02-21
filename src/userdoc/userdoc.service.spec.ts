import { Test, TestingModule } from '@nestjs/testing';
import { UserdocService } from './userdoc.service';

describe('UserdocService', () => {
  let service: UserdocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserdocService],
    }).compile();

    service = module.get<UserdocService>(UserdocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
