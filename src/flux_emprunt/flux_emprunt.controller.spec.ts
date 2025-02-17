import { Test, TestingModule } from '@nestjs/testing';
import { FluxEmpruntController } from './flux_emprunt.controller';

describe('FluxEmpruntController', () => {
  let controller: FluxEmpruntController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FluxEmpruntController],
    }).compile();

    controller = module.get<FluxEmpruntController>(FluxEmpruntController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
