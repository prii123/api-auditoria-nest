import { Module } from '@nestjs/common';
import { InformesService } from './informes.service';
import { InformesController } from './informes.controller';
import { DocumentoEntity } from '../documentos/entities/documento.entity';
import { TipoDocumentoEntity } from '../documentos/entities/tipodocumentos.entity';
import { Informe } from './entities/informe.entity'
import { UsuarioModule } from 'src/usuario/usuario.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Informe, DocumentoEntity, TipoDocumentoEntity]),
    UsuarioModule
  ],
  controllers: [InformesController],
  providers: [InformesService],
})
export class InformesModule {}
