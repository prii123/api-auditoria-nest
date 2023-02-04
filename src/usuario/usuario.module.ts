import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { FirmaService } from './firma.service';
import { UsuarioController } from './usuario.controller';
import { FirmaController } from './firma.controller';
import { UsersEntity } from './entities/usuario.entity';
import { FirmasEntity } from './entities/firmas.entity';
import { TipoUsersEntity } from './entities/tipoUsuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TipoUsersEntity, FirmasEntity])
  ],
  controllers: [UsuarioController, FirmaController],
  providers: [UsuarioService, AuthModule, FirmaService],
  exports:[UsuarioService]
})
export class UsuarioModule { }
