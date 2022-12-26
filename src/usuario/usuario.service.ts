import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsersEntity } from './entities/usuario.entity';
import { TipoUsersEntity } from './entities/tipoUsuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { generateHash } from '../auth/utils/handleBcrypt'


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>,
    @InjectRepository(TipoUsersEntity) private tipoUsersRepo: Repository<TipoUsersEntity>
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const newUsers = this.usersRepo.create(createUsuarioDto);
    // newUsers.name = createUsuarioDto.name;
    newUsers.password = await generateHash(createUsuarioDto.password);
    return this.usersRepo.save(newUsers);
  }

  async findTipeUser() {
    const tipoUsuario = await this.tipoUsersRepo.find()
    return tipoUsuario
  }

  async findAll() {
    const users = await this.usersRepo.find()
    return users;
  }

  async findOne(id: any) {
    // if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException('El usuario no existe.');
    const user = await this.usersRepo.findOneBy(id);
    return user;
  }

  async update(id: any, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.usersRepo.findOneBy(id);
    this.usersRepo.merge(user, updateUsuarioDto);
    return this.usersRepo.save(user);

  }

  async remove(id: number) {
    await this.usersRepo.delete(id);
    return true;
  }
}


