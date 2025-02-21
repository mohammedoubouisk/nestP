import { Test, TestingModule } from '@nestjs/testing';
import { UserdocController } from './userdoc.controller';

describe('UserdocController', () => {
  let controller: UserdocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdocController],
    }).compile();

    controller = module.get<UserdocController>(UserdocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
