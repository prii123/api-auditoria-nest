import { Module } from '@nestjs/common';
import { RetencionConfiguracionService } from './retencion-configuracion.service';
import { RetencionConfiguracionController } from './retencion-configuracion.controller';
import { RetencionConfiguracionEntity } from './entities/retencion-configuracion.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RetencionConfiguracionEntity], 'operacion')
  ],
  controllers: [RetencionConfiguracionController],
  providers: [RetencionConfiguracionService]
})
export class RetencionConfiguracionModule {}
