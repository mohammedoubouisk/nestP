import { Test, TestingModule } from '@nestjs/testing';
import { FluxEmpruntEntreController } from './flux_emprunt-entre.controller';

describe('FluxEmpruntEntreController', () => {
  let controller: FluxEmpruntEntreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FluxEmpruntEntreController],
    }).compile();

    controller = module.get<FluxEmpruntEntreController>(FluxEmpruntEntreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
