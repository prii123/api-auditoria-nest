import { Module } from '@nestjs/common';
import { HallazgosService } from './hallazgos.service';
import { HallazgosController } from './hallazgos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hallazgo } from './entities/hallazgo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hallazgo])
  ],
  controllers: [HallazgosController],
  providers: [HallazgosService] 
})
export class HallazgosModule {}
