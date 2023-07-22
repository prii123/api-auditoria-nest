import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { DocumentoEntity } from './entities/documento.entity';
import { TipoDocumentoEntity } from './entities/tipodocumentos.entity';


@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(DocumentoEntity) private empresaRepo: Repository<DocumentoEntity>,
    @InjectRepository(TipoDocumentoEntity) private tipoDocumentoRepo: Repository<TipoDocumentoEntity>,
  ) { }


  tipoDeDocumentos() {
    const tipoDocs = this.tipoDocumentoRepo.find()
    return tipoDocs
  }

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

    console.log(result)

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

  async cantidaPorDocumentos(periodo: string, empresaId: string) {




    let query = "SELECT * FROM tipo_documentos"
    const documentos: any = await this.tipoDocumentoRepo.query(query)

    var array: Array<{}> = [];
    let tipoDoc: any = '';

    // console.log(documentos.length)

    for (let i = 0; i < documentos.length; i++) {

      tipoDoc = documentos[i].id;
      // const [result]: any = await conn.query(queryDocumento.contarNumerodeDocumentos, [
      //   idEmpresa,
      //   periodo,
      //   tipoDoc
      // ]);

      let query2 = "SELECT COUNT(numeroDoc) as total FROM documento WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "' AND tipoDoc = " + tipoDoc + ""
      const result = await this.empresaRepo.query(query2)

      if (result) {
        const data = {
          id: documentos[i]?.id,
          cantidad: result[0].total
        }
        array.push(data)
      }
    }
    return array
  }

  async actualizarHa(id: any, updateDocumentogoDto: any) {

    let query = "SELECT * FROM documento WHERE id = " + id + ""
    const user = await this.empresaRepo.query(query)

    if (user == '' || user == undefined) return 'el hallazgo no existe'

    let query2 = "UPDATE documento SET hallazgo = " + updateDocumentogoDto?.hallazgo + " WHERE id = " + id + ""
    // this.empresaRepo.merge(user,updateDocumentogoDto);
    const update = await this.empresaRepo.query(query2)

    return update;
  }
}
