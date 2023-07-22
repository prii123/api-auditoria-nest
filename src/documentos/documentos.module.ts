import { Module } from '@nestjs/common';
import { DocumentosService } from './documento/documentos.service';
import { DocumentosController } from './documento/documentos.controller';
import { DocumentoEntity } from './documento/entities/documento.entity';
import { TipoDocumentoEntity } from './documento/entities/tipodocumentos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosConfigModule } from './documentos-config/documentos-config.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([DocumentoEntity, TipoDocumentoEntity]),
    DocumentosConfigModule
  ],
  controllers: [DocumentosController],
  providers: [DocumentosService],
  exports: [DocumentosService]
})
export class DocumentosModule {}
