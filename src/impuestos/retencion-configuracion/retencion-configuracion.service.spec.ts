import { Test, TestingModule } from '@nestjs/testing';
import { RetencionConfiguracionService } from './retencion-configuracion.service';

describe('RetencionConfiguracionService', () => {
  let service: RetencionConfiguracionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetencionConfiguracionService],
    }).compile();

    service = module.get<RetencionConfiguracionService>(RetencionConfiguracionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
