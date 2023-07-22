import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosConfigService } from './documentos-config.service';

describe('DocumentosConfigService', () => {
  let service: DocumentosConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentosConfigService],
    }).compile();

    service = module.get<DocumentosConfigService>(DocumentosConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
