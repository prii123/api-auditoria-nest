import { Test, TestingModule } from '@nestjs/testing';
import { RetencionFuenteService } from './retencion-fuente.service';

describe('RetencionFuenteService', () => {
  let service: RetencionFuenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetencionFuenteService],
    }).compile();

    service = module.get<RetencionFuenteService>(RetencionFuenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
