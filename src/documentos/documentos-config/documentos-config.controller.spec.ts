import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosConfigController } from './documentos-config.controller';
import { DocumentosConfigService } from './documentos-config.service';

describe('DocumentosConfigController', () => {
  let controller: DocumentosConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentosConfigController],
      providers: [DocumentosConfigService],
    }).compile();

    controller = module.get<DocumentosConfigController>(DocumentosConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
