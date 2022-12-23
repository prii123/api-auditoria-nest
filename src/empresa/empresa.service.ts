import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Repository } from 'typeorm';
import { EmpresaDTO } from './dto/empresa.dto';
import { EmpresasEntity } from './entities/empresas.entity';



@Injectable()
export class EmpresaService {

    constructor( @InjectRepository(EmpresasEntity) private empresaRepo: Repository<EmpresasEntity> ) { }


    async create(createEmpresaDto: EmpresaDTO, usuario_registrado:number) {
        const newUsers = this.empresaRepo.create(createEmpresaDto)
        // newUsers.nit = createEmpresaDto.nit;
        // newUsers.razonSocial = createEmpresaDto.razonSocial;
        // newUsers.digitoVerificacion = createEmpresaDto.digitoVerificacion;
        // newUsers.direccion = createEmpresaDto.direccion;
        // newUsers.ciudad = createEmpresaDto.ciudad;
        // newUsers.logo = createEmpresaDto.logo;
        newUsers.creadorId = usuario_registrado;
        console.log(newUsers)
        return this.empresaRepo.save(newUsers);
    }

    async findAll() {
        const users = await this.empresaRepo.find()
        return users;
    }

    async findOne(id: any) {
        // if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundException('El usuario no existe.');
        let query = "SELECT * FROM empresas where id = "+id+""
        const empresa = await this.empresaRepo.query(query)
        return empresa;
    }

    async update(id: any, createEmpresaDto: EmpresaDTO) {
        // console.log(id)
        // console.log(createEmpresaDto)
        let query = "SELECT * FROM empresas WHERE id = "+id+""
        const user = await this.empresaRepo.query(query);
        this.empresaRepo.merge(user[0], createEmpresaDto);
        return this.empresaRepo.save(user);

    }

    async remove(id: number) {
        await this.empresaRepo.delete(id);
        return true;
    }
}
