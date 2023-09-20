import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHallazgoDto } from './dto/create-hallazgo.dto';
import { UpdateHallazgoDto } from './dto/update-hallazgo.dto';
import { Hallazgo } from './entities/hallazgo.entity';

@Injectable()
export class HallazgosService {
  constructor( @InjectRepository(Hallazgo, 'operacion') private hallazgosRepo: Repository<Hallazgo>) {}


  create(createHallazgoDto: CreateHallazgoDto) {
    // console.log(createHallazgoDto)
    const newHallazgo = this.hallazgosRepo.create(createHallazgoDto);
    // console.log(newHallazgo)
    return this.hallazgosRepo.save(newHallazgo);
  }

  async findAll() {
    const hallazgos = await this.hallazgosRepo.find()
    return hallazgos;
  }

  async findByEmpresaidAndPeriodo(empresaId: number, periodo: string) {
    let query = "SELECT documento.numeroDoc, hallazgoz_y_correcciones.tipodocumentoId, tipo_documentos.nombre, hallazgoz_y_correcciones.hallazgo, hallazgoz_y_correcciones.accionCorrectiva, documento.empresaId, documento.periodo, hallazgoz_y_correcciones.created_at FROM hallazgoz_y_correcciones, documento, tipo_documentos WHERE hallazgoz_y_correcciones.documentoId = documento.id AND hallazgoz_y_correcciones.tipodocumentoId = tipo_documentos.id AND documento.empresaId = "+empresaId+" AND documento.periodo = '"+periodo+"'";
    const hallazgos = await this.hallazgosRepo.query(query)
    // .manager
    // .createQueryBuilder()
    // .select('hallazgoz_y_correcciones')
    // .from(Hallazgo, 'hallazgoz_y_correcciones')
    // .where('hallazgoz_y_correcciones.periodo = :periodo', { periodo })
    // .andWhere("hallazgoz_y_correcciones.empresaId = :empresaId", { empresaId })
    // .getMany()
    return hallazgos;
  }

  async findByEmpresaidAndPeriodoGenerales(empresaId: number, periodo: string) {
    // let query = "SELECT documento.numeroDoc, hallazgoz_y_correcciones.tipodocumentoId, tipo_documentos.nombre, hallazgoz_y_correcciones.hallazgo, hallazgoz_y_correcciones.accionCorrectiva, documento.empresaId, documento.periodo, hallazgoz_y_correcciones.created_at FROM hallazgoz_y_correcciones, documento, tipo_documentos WHERE hallazgoz_y_correcciones.documentoId = documento.id AND hallazgoz_y_correcciones.tipodocumentoId = tipo_documentos.id AND documento.empresaId = "+empresaId+" AND documento.periodo = '"+periodo+"'";
    let query = "SELECT * FROM hallazgoz_y_correcciones WHERE documentoId is NULL and empresaId = "+empresaId+" AND periodo = '"+periodo+"'"
      const hallazgos = await this.hallazgosRepo.query(query)
      return hallazgos;

  }

  async findOne(id: any) {
    const user = await this.hallazgosRepo.findOneBy(id);
    return user;
  }

  async buscaPorDocumentoId(documentoId: any) {
    let query = "SELECT * FROM hallazgoz_y_correcciones WHERE documentoId = "+documentoId+""
    // const user = await this.hallazgosRepo.findOneBy(documentoId);
    const user = await this.hallazgosRepo.query(query);
    return user;
  }

  async update(id: any, updateHallazgoDto: UpdateHallazgoDto) {
    const user = await this.hallazgosRepo.findOneBy(id);
    this.hallazgosRepo.merge(user,updateHallazgoDto);
    return this.hallazgosRepo.save(user);
  }

  async remove(id: any) {
    await this.hallazgosRepo.delete(id);
    return true;
  }

 
}
