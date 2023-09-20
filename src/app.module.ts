import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module'
import { DocumentosModule } from './documentos/documentos.module';
import { HallazgosModule } from './hallazgos/hallazgos.module';
import { RetencionFuenteModule } from './impuestos/retencion-fuente/retencion-fuente.module';
import { RetencionConfiguracionModule } from './impuestos/retencion-configuracion/retencion-configuracion.module';
import { InformesModule } from './informes/informes.module';
import { FuenteDocsModule } from './fuente_docs/fuente_docs.module';
import { FuenteDocsInModule } from './fuente_in/fuente_in.module';


@Module({
  // BASE DE DATOS OPERACION
  imports: [
    TypeOrmModule.forRoot({
      name: 'operacion',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'auditoria',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),

    // BASE DE DATOS FUENTE
    TypeOrmModule.forRoot({
      name: 'fuente',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fuente_docs',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),


    AuthModule,
    EmpresaModule,
    UsuarioModule,
    DocumentosModule,
    HallazgosModule,
    RetencionFuenteModule,
    RetencionConfiguracionModule,
    InformesModule,
    FuenteDocsModule,
    FuenteDocsInModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
