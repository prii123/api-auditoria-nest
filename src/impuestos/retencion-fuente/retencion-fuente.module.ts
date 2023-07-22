import { Module } from '@nestjs/common';
import { RetencionFuenteService } from './retencion-fuente.service';
import { RetencionFuenteController } from './retencion-fuente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleRetencionFuente } from './entities/retencion-fuente.entity';
import { TipoRetencionFuente } from './entities/tipo-retencion.entity';
import { DocumentoEntity } from 'src/documentos/documento/entities/documento.entity';
import {  TotalesRetencionFuente} from './entities/totales-retencion.entity'
import { EmpresasEntity } from '../../empresa/entities/empresas.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleRetencionFuente, TipoRetencionFuente, 
      DocumentoEntity, TotalesRetencionFuente, EmpresasEntity])
  ],
  controllers: [RetencionFuenteController],
  providers: [RetencionFuenteService]
})
export class RetencionFuenteModule {}
