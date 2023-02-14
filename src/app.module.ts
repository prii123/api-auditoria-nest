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
import { InformesModule } from './informes/informes.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-mysql-auditorias-do-user-12795625-0.b.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_fCAKMaPW24A5InGSp1T',
      database: 'auditoria',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    EmpresaModule,
    UsuarioModule,
    DocumentosModule,
    HallazgosModule,
    RetencionFuenteModule,
    InformesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
