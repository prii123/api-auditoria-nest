import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrmModule
import { DocumentosConfig } from './entities/documentos-config.entity'; // Importa el Entity
import { DocumentosConfigService } from './documentos-config.service';
import { DocumentosConfigController } from './documentos-config.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentosConfig], 'operacion'), // Agrega el Entity al módulo utilizando forFeature()
  ],
  controllers: [DocumentosConfigController],
  providers: [DocumentosConfigService],
})
export class DocumentosConfigModule {}
