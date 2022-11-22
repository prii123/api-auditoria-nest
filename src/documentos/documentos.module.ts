import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { DocumentoEntity } from './entities/documento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([DocumentoEntity])
  ],
  controllers: [DocumentosController],
  providers: [DocumentosService]
})
export class DocumentosModule {}
