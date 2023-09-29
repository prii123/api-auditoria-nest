import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoEntity } from 'src/documentos/documento/entities/documento.entity';
import { TipoDocumentoEntity } from 'src/documentos/documento/entities/tipodocumentos.entity';
import { Informe } from './entities/informe.entity';
import { Repository } from 'typeorm';
import { CreateInformeDto } from './dto/create-informe.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { FuenteDocsService } from 'src/fuente_docs/fuente_docs.service';


@Injectable()
export class InformesService {
  constructor(
    private readonly usuario: UsuarioService,
    private readonly docs_fuente: FuenteDocsService,
    @InjectRepository(DocumentoEntity, 'operacion') private documento: Repository<DocumentoEntity>,
    @InjectRepository(TipoDocumentoEntity, 'operacion') private tipoDocumento: Repository<TipoDocumentoEntity>,
    @InjectRepository(Informe, 'operacion') private informe: Repository<Informe>,

  ) { }

 

  async consultaHallazgos(empresaId: number, periodo: string) {
    // console.log(empresaId + " - " + periodo)

    let query = "SELECT  * FROM hallazgoz_y_correcciones, tipo_documentos WHERE hallazgoz_y_correcciones.tipodocumentoId = tipo_documentos.id AND hallazgoz_y_correcciones.empresaId = " + empresaId + " AND hallazgoz_y_correcciones.periodo = '" + periodo + "'  ORDER BY  hallazgoz_y_correcciones.tipodocumentoId ASC";
    const users = await this.documento.query(query);
    return users;
  }

  async datosParaElInforme(empresaId: number, periodo: string) {
    let query = "SELECT informedeauditoria.*, tipo_documentos.nombre, usuarios.name, usuarios.email, empresas.razonSocial FROM informedeauditoria, usuarios, tipo_documentos, empresas WHERE empresas.id = informedeauditoria.empresaId AND usuarios.id = informedeauditoria.idCreador AND tipo_documentos.id =informedeauditoria.tipoDoc AND informedeauditoria.empresaId = " + empresaId + " AND informedeauditoria.periodo =  '" + periodo + "'";
    const users = await this.documento.query(query);
    return users;
  }





  async preparaElInforme(empresaId: number, periodo: string, id: number) {
    const aniio = parseInt(periodo.split("-")[0])
    const mes = parseInt(periodo.split("-")[1])
    /**
     * Borra el informe que se ha generado para la empresa y el periodo determinado el cual sera remplazado
    */
    let query = "DELETE FROM informedeauditoria WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "'";
    await this.documento.query(query);

    /**
     * MINIMO Y MAXIMOS DE CADA TIPO DE DOCUMENTOS
    */
    const documentos = await this.docs_fuente.minimosYmaximos(empresaId, aniio, mes)
    // console.log(documentos)

    // const usuario = await this.usuario


    /**
     * si encuentra algun documento fuente deltro del resultado de la query
     * formara una arreglo para el informe de auditoria tributaria y posteriormente
     * se guardara los datos en una tabla definida para el informe
     */


    const docS = [
      {
        empresaId,
        tipoDoc: 1,
        periodo,
        min: documentos.factura.min,
        max: documentos.factura.max
      },
      {
        empresaId,
        tipoDoc: 5,
        periodo,
        min: documentos.notaCCompra.min,
        max: documentos.notaCCompra.max
      },
      {
        empresaId,
        tipoDoc: 3,
        periodo,
        min: documentos.notaCVenta.min,
        max: documentos.notaCVenta.max
      },
      {
        empresaId,
        tipoDoc: 4,
        periodo,
        min: documentos.cuentaPorPagar.min,
        max: documentos.cuentaPorPagar.max
      },
      {
        empresaId,
        tipoDoc: 8,
        periodo,
        min: documentos.notaDCompra.min,
        max: documentos.notaDCompra.max
      },
      {
        empresaId,
        tipoDoc: 9,
        periodo,
        min: documentos.notaDVenta.min,
        max: documentos.notaDVenta.max
      },
      {
        empresaId,
        tipoDoc: 9,
        periodo,
        min: documentos.pagoDirecto.min,
        max: documentos.pagoDirecto.max
      }
    ]


    docS.map(async (doc) => {
       const query = `INSERT INTO informedeauditoria SET empresaId=${doc.empresaId}, tipoDoc=${doc.tipoDoc}, idCreador=${id}, periodo='${doc.periodo}', valMax=${doc.max}, valMin=${doc.min}`
        await this.informe.query(query);
    })



    // const tipoDoc: number = documentos.cuentaPorPagar;
    // const idCreador: number = id;
    // const periodo: string = result[0].periodo;
    // const valMin: number = result[0].numeroDoc || 0;
    // const valMax: number = result[result.length - 1].numeroDoc || 0;

    // const valoresInforme: CreateInformeDto = {
    //   empresaId,
      // tipoDoc,
      // idCreador,
      // periodo,
      // valMax,
    //   valMin,
    // };


    // /**
    //  * con los datos obtenidos se guardan en una tabla de la base de datos
    //  */
    // const query = `INSERT INTO informedeauditoria SET empresaId=${empresaId}, tipoDoc=${tipoDoc}, idCreador=${idCreador}, periodo='${periodo}', valMax=${valMax}, valMin=${valMin}`

    // const crearInf = await this.informe.query(query);


    return 'OK';
  }

  async periodosPorUsuario(id: number) {

    const usuario = this.usuario.findOne(id)

    const periodos = await this.docs_fuente.periodos()

    return periodos

  }



  /**
   *
   * @param periodo para remplazar en el front end
   * @param id
   * @returns
   */
  async empresasPorPeriodo(periodo: string, id: number) {

    const usuario = this.usuario.findOne(id)

    if (!usuario) return "Hay un problema de reconocimiento, por favor cierra sesion e intenta nuevamente"

    if ((await usuario).idRol == 1) {


      let query = "SELECT DISTINCT empresas.id, empresas.razonSocial FROM  empresas";
      const empresas = await this.documento.query(query)
      return empresas;


    } else if ((await usuario).idRol == 2) {


      let query = "SELECT DISTINCT empresas.id, empresas.razonSocial FROM  empresas WHERE empresas.creadorId = '" + id + "' "
      const empresas = await this.documento.query(query)
      return empresas;


    }




  }



}
