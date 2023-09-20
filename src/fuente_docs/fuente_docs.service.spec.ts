import { Test, TestingModule } from '@nestjs/testing';
import { FuenteDocsService } from './fuente_docs.service';

describe('FuenteDocsService', () => {
  let service: FuenteDocsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuenteDocsService],
    }).compile();

    service = module.get<FuenteDocsService>(FuenteDocsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
