import { Test, TestingModule } from '@nestjs/testing';
import { HallazgosController } from './hallazgos.controller';
import { HallazgosService } from './hallazgos.service';

describe('HallazgosController', () => {
  let controller: HallazgosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallazgosController],
      providers: [HallazgosService],
    }).compile();

    controller = module.get<HallazgosController>(HallazgosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
