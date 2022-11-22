import { Test, TestingModule } from '@nestjs/testing';
import { HallazgosService } from './hallazgos.service';

describe('HallazgosService', () => {
  let service: HallazgosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HallazgosService],
    }).compile();

    service = module.get<HallazgosService>(HallazgosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
