import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { DocumentoEntity } from './entities/documento.entity';
import { TipoDocumentoEntity } from './entities/tipodocumentos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([DocumentoEntity, TipoDocumentoEntity])
  ],
  controllers: [DocumentosController],
  providers: [DocumentosService],
  exports: [DocumentosService]
})
export class DocumentosModule {}
