import { Test, TestingModule } from '@nestjs/testing';
import { RetencionConfiguracionController } from './retencion-configuracion.controller';
import { RetencionConfiguracionService } from './retencion-configuracion.service';

describe('RetencionConfiguracionController', () => {
  let controller: RetencionConfiguracionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetencionConfiguracionController],
      providers: [RetencionConfiguracionService],
    }).compile();

    controller = module.get<RetencionConfiguracionController>(RetencionConfiguracionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
