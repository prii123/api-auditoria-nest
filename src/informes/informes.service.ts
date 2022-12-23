import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoEntity } from 'src/documentos/entities/documento.entity';
import { TipoDocumentoEntity } from 'src/documentos/entities/tipodocumentos.entity';
import { Informe } from './entities/informe.entity';
import { Repository } from 'typeorm';
import { CreateInformeDto } from './dto/create-informe.dto';
import { UsuarioService } from 'src/usuario/usuario.service';


@Injectable()
export class InformesService {
  constructor(
    private readonly usuario: UsuarioService,
    @InjectRepository(DocumentoEntity) private documento: Repository<DocumentoEntity>,
    @InjectRepository(TipoDocumentoEntity) private tipoDocumento: Repository<TipoDocumentoEntity>,
    @InjectRepository(Informe) private informe: Repository<Informe>,

  ) { }

  async consultarPeriodosPorEmpresa(empresaId: number) {
    console.log(empresaId)
    let query = "SELECT DISTINCT periodo FROM documento WHERE empresaId = " + empresaId + " ORDER BY periodo DESC"
    const users = await this.documento.query(query)
    return users;
  }

  async consultaHallazgos(empresaId: number, periodo: string) {
    let query = "SELECT documento.numeroDoc, hallazgoz_y_correcciones.tipodocumentoId, tipo_documentos.nombre, hallazgoz_y_correcciones.hallazgo, hallazgoz_y_correcciones.accionCorrectiva, documento.empresaId, documento.periodo, hallazgoz_y_correcciones.created_at FROM hallazgoz_y_correcciones, documento, tipo_documentos WHERE hallazgoz_y_correcciones.documentoId = documento.id AND hallazgoz_y_correcciones.tipodocumentoId = tipo_documentos.id AND documento.empresaId = " + empresaId + " AND documento.periodo = '" + periodo + "'";
    const users = await this.documento.query(query);
    return users;
  }

  async datosParaElInforme(empresaId: number, periodo: string) {
    let query = "SELECT informedeauditoria.*, tipo_documentos.nombre, usuarios.name, usuarios.email, empresas.razonSocial FROM informedeauditoria, usuarios, tipo_documentos, empresas WHERE empresas.id = informedeauditoria.empresaId AND usuarios.id = informedeauditoria.idCreador AND tipo_documentos.id =informedeauditoria.tipoDoc AND informedeauditoria.empresaId = " + empresaId + " AND informedeauditoria.periodo =  '" + periodo + "'";
    const users = await this.documento.query(query);
    return users;
  }

  async preparaElInforme(empresaId: number, periodo: string, id: number) {
    /**
     * Borra el informe que se ha generado para la empresa y el periodo determinado el cual sera remplazado
    */
    let query = "DELETE FROM informedeauditoria WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "'";
    await this.documento.query(query);

    /**
     * Busca los tipos de documentos
    */
    const result2 = await this.tipoDocumento.find();

    


    /**
       * por cada tipo de documento fuente se hara un map y luego
       * se hara otra query para filtrar cada documento
       */
    result2.map(async (doc: any, key: number) => {
      /**
       * se hace una query que filtra los documentos y las empresas
       */
      let query = "SELECT * FROM empresas, documento WHERE empresas.id = documento.empresaId AND documento.tipoDoc = " + doc.id + " AND empresas.id = " + empresaId + " AND documento.periodo = '" + periodo + "' ORDER BY documento.numeroDoc asc";
      const result = await this.documento.query(query);

      /**
       * si encuentra algun documento fuente deltro del resultado de la query
       * formara una arreglo para el informe de auditoria tributaria y posteriormente
       * se guardara los datos en una tabla definida para el informe
       */

      if (result.length > 0) {
        // console.log(result[key])
        const tipoDoc: number = doc.id;
        const idCreador: number = id;
        const periodo: string = result[0].periodo;
        const valMin: number = result[0].numeroDoc || 0;
        const valMax: number = result[result.length - 1].numeroDoc || 0;

        const valoresInforme: CreateInformeDto = {
          empresaId,
          tipoDoc,
          idCreador,
          periodo,
          valMax,
          valMin,
        };

        console.log(valoresInforme)
        /**
         * con los datos obtenidos se guardan en una tabla de la base de datos
         */
        const query = `INSERT INTO informedeauditoria SET empresaId=${empresaId}, tipoDoc=${tipoDoc}, idCreador=${idCreador}, periodo='${periodo}', valMax=${valMax}, valMin=${valMin}`

        const crearInf = await this.informe.query(query);
        // console.log(query)
        // console.log(crearInf)
        // // this.informe.save(crearInf);


      }
    });



    return 'OK';
  }

  async periodosPorUsuario(id: number) {

    const usuario = this.usuario.findOne(id)

    if ((await usuario).idRol == 1) {


      let query = "SELECT DISTINCT periodo FROM documento ORDER BY periodo DESC";
      const periodos = await this.documento.query(query)
      return periodos;


    } else if ((await usuario).idRol == 2) {


      let query = "SELECT DISTINCT periodo FROM documento, empresas WHERE documento.empresaId = empresas.id AND  empresas.creadorId = "+id+" ORDER BY periodo DESC"
      const periodos = await this.documento.query(query)
      return periodos;


    }




  }


  async empresasPorPeriodo(periodo: string, id: number) {

    const usuario = this.usuario.findOne(id)

    if (!usuario) return "Hay un problema de reconocimiento, por favor cierra sesion e intenta nuevamente"

    if ((await usuario).idRol == 1) {


      let query = "SELECT DISTINCT empresas.id, empresas.razonSocial FROM documento, empresas WHERE documento.empresaId = empresas.id AND documento.periodo = '"+periodo+"'";
      const empresas = await this.documento.query(query)
      return empresas;


    } else if ((await usuario).idRol == 2) {


      let query = "SELECT DISTINCT empresas.id, empresas.razonSocial FROM documento, empresas WHERE documento.empresaId = empresas.id AND empresas.creadorId= '"+id+"' AND documento.periodo = '"+periodo+"'"
      const empresas = await this.documento.query(query)
      return empresas;


    }




  }



}
