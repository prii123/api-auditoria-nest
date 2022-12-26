import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsersEntity } from './entities/usuario.entity';
import { TipoUsersEntity } from './entities/tipoUsuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TipoUsersEntity])
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, AuthModule],
  exports:[UsuarioService]
})
export class UsuarioModule { }
