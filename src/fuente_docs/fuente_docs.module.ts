import { Module } from '@nestjs/common';
import { FuenteDocsService } from './fuente_docs.service';
import { FuenteDocsController } from './fuente_docs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConceptosEntity } from './entities/conceptos.entity';
import { ConciliarComprasContEntity } from './entities/conciliarComprasCont.entity';
import { CuentasPorPagarEntity } from './entities/cuentasPorPagar.entity';
import { NotaCComprasEntity } from './entities/notaCCompras.entity';
import { NotaDComprasEntity } from './entities/notaDCompras.entity';
import { OrdenPagoContEntity } from './entities/ordenPagoCont.entity';
import { PagoDirectoContEntity } from './entities/pagoDirectoCont.entity';
import { RCajaContEntity } from './entities/rcaja_cont.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ConceptosEntity,
      ConciliarComprasContEntity,
      CuentasPorPagarEntity,
      NotaCComprasEntity,
      NotaDComprasEntity,
      OrdenPagoContEntity,
      PagoDirectoContEntity,
      RCajaContEntity
    ], 'fuente'),
  ],
  controllers: [FuenteDocsController],
  providers: [FuenteDocsService]
})
export class FuenteDocsModule {}
