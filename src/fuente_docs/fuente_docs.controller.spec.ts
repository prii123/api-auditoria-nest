import { Test, TestingModule } from '@nestjs/testing';
import { FuenteDocsController } from './fuente_docs.controller';
import { FuenteDocsService } from './fuente_docs.service';

describe('FuenteDocsController', () => {
  let controller: FuenteDocsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuenteDocsController],
      providers: [FuenteDocsService],
    }).compile();

    controller = module.get<FuenteDocsController>(FuenteDocsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
