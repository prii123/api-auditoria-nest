import { Test, TestingModule } from '@nestjs/testing';
import { RetencionFuenteController } from './retencion-fuente.controller';
import { RetencionFuenteService } from './retencion-fuente.service';

describe('RetencionFuenteController', () => {
  let controller: RetencionFuenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetencionFuenteController],
      providers: [RetencionFuenteService],
    }).compile();

    controller = module.get<RetencionFuenteController>(RetencionFuenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
