import { Test, TestingModule } from '@nestjs/testing';
import { StatistiqueUtilisateurController } from './statistique-utilisateur.controller';

describe('StatistiqueUtilisateurController', () => {
  let controller: StatistiqueUtilisateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatistiqueUtilisateurController],
    }).compile();

    controller = module.get<StatistiqueUtilisateurController>(StatistiqueUtilisateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
