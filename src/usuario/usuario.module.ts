import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsersEntity } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity])
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports:[UsuarioService]
})
export class UsuarioModule { }
