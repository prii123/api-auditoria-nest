import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasEntity } from './entities/empresas.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';



@Module({
  imports:[
    TypeOrmModule.forFeature([EmpresasEntity], 'operacion'),
    UsuarioModule
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService]
})
export class EmpresaModule {}
