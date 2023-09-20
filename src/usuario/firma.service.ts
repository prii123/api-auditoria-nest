import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CrearFirmaDTO } from './dto/crear-firmas.dto';
import { UsersEntity } from './entities/usuario.entity';
import { TipoUsersEntity } from './entities/tipoUsuario.entity';
import { FirmasEntity } from './entities/firmas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class FirmaService {
  constructor(
    @InjectRepository(FirmasEntity, 'operacion') private firmasRepo: Repository<FirmasEntity>
  ) { }


  /**
   * seccion para las firmas
  */

  async crearFirma(crearFirmaDTO: CrearFirmaDTO) {
    const createFirma = this.firmasRepo.create(crearFirmaDTO)
    return this.firmasRepo.save(createFirma);
  }

  async consultarfirmas() {
    // const query = "SELECT * FROM firmas"
    // console.log(query)
    const firma = await this.firmasRepo.find()
    return firma;
  }

  async consultarfirmasById(id: any) {

    const firma = await this.firmasRepo.findOneBy({id})
    return firma;
  }

  async updateFirma(id: any, crearFirmaDTO: CrearFirmaDTO) {
    const firmaUpdate = await this.firmasRepo.findOneBy({id});
    if (!firmaUpdate) {
      return null; // O puedes lanzar una excepción o un mensaje de error aquí si lo deseas
    }
    Object.assign(firmaUpdate, crearFirmaDTO);
    return await this.firmasRepo.save(firmaUpdate);

  }


}