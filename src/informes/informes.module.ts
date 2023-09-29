import { Module } from '@nestjs/common';
import { InformesService } from './informes.service';
import { InformesController } from './informes.controller';
import { DocumentoEntity } from '../documentos/documento/entities/documento.entity';
import { TipoDocumentoEntity } from '../documentos/documento/entities/tipodocumentos.entity';
import { Informe } from './entities/informe.entity'
import { UsuarioModule } from 'src/usuario/usuario.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuenteDocsModule } from 'src/fuente_docs/fuente_docs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Informe, DocumentoEntity, TipoDocumentoEntity], 'operacion'),
    UsuarioModule,
    FuenteDocsModule
  ],
  controllers: [InformesController],
  providers: [InformesService],
})
export class InformesModule {}
