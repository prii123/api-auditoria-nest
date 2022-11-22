import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { DocumentoEntity } from './entities/documento.entity';


@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(DocumentoEntity) private empresaRepo: Repository<DocumentoEntity>,
  ) { }

  create(createDocumentoDto: CreateDocumentoDto[]) {

    createDocumentoDto?.map(async (doc: CreateDocumentoDto) => {
      const newDoc = this.empresaRepo.create(doc)
      this.empresaRepo.save(newDoc);
    })


    return 'ok'
  }

  async findAllByPeriodoTipoDocEmpresaId(periodo: string, tipoDoc: string, empresaId: string) {

    const result = await this.empresaRepo.manager
    .createQueryBuilder()
    .select('documento')
    .from(DocumentoEntity, 'documento')
    .where('documento.periodo = :periodo', { periodo })
    .andWhere("documento.tipoDoc = :tipoDoc", { tipoDoc })
    .andWhere("documento.empresaId = :empresaId", { empresaId })
    .getMany()

    return result;
  }

  async findOne(id: any) {
    const user = await this.empresaRepo.findOneBy(id);
    return user;
  }


  async removeDocumentos(periodo: string, tipoDoc: string, empresaId: string) {
    const result = await this.empresaRepo
    .createQueryBuilder('documento')
    .delete()
    .from(DocumentoEntity)
    .where('documento.periodo = :periodo', { periodo })
    .andWhere("documento.tipoDoc = :tipoDoc", { tipoDoc })
    .andWhere("documento.empresaId = :empresaId", { empresaId })
    .execute();

    return result
  }

  async remove(id: number) {
    const result = await this.empresaRepo
    .createQueryBuilder('documento')
    .delete()
    .from(DocumentoEntity)
    .where('documento.id = :id', { id })
    .execute();

    return result
  }
}
