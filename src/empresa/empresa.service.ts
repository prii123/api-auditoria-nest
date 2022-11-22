import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Repository } from 'typeorm';
import { EmpresaDTO } from './dto/empresa.dto';
import { EmpresasEntity } from './entities/empresas.entity';



@Injectable()
export class EmpresaService {

    constructor( @InjectRepository(EmpresasEntity) private empresaRepo: Repository<EmpresasEntity> ) { }


    async create(createEmpresaDto: EmpresaDTO) {
        const newUsers = this.empresaRepo.create(createEmpresaDto)
        // newUsers.nit = createEmpresaDto.nit;
        // newUsers.razonSocial = createEmpresaDto.razonSocial;
        // newUsers.digitoVerificacion = createEmpresaDto.digitoVerificacion;
        // newUsers.direccion = createEmpresaDto.direccion;
        // newUsers.ciudad = createEmpresaDto.ciudad;
        // newUsers.logo = createEmpresaDto.logo;
        // newUsers.autorrenta = createEmpresaDto.autorrenta;
        return this.empresaRepo.save(newUsers);
    }

    async findAll() {
        const users = await this.empresaRepo.find()
        return users;
    }

    async findOne(id: any) {
        // if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException('El usuario no existe.');
        const user = await this.empresaRepo.findOneBy(id);
        return user;
    }

    async update(id: any, createEmpresaDto: EmpresaDTO) {
        const user = await this.empresaRepo.findOneBy(id);
        this.empresaRepo.merge(user, createEmpresaDto);
        return this.empresaRepo.save(user);

    }

    async remove(id: number) {
        await this.empresaRepo.delete(id);
        return true;
    }
}
