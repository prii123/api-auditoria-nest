import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetalleRetencionFuenteDto } from './dto/detalle-retencion-fuente.dto';
import { UpdateRetencionFuenteDto } from './dto/update-retencion-fuente.dto';
import { DetalleRetencionFuente } from './entities/retencion-fuente.entity';
import { TipoRetencionFuente } from './entities/tipo-retencion.entity';
import { DocumentoEntity } from '../../documentos/documento/entities/documento.entity'
import { TotalesRetencionFuente } from './entities/totales-retencion.entity';
import { EmpresasEntity } from 'src/empresa/entities/empresas.entity';
import { FuenteDocsService } from 'src/fuente_docs/fuente_docs.service';

@Injectable()
export class RetencionFuenteService {

  constructor(
    private readonly docs_fuente: FuenteDocsService,
    @InjectRepository(DetalleRetencionFuente, 'operacion') private detalleReteaRepo: Repository<DetalleRetencionFuente>,
    @InjectRepository(TipoRetencionFuente, 'operacion') private tipoReteaRepo: Repository<TipoRetencionFuente>,
    @InjectRepository(DocumentoEntity, 'operacion') private documentos: Repository<DocumentoEntity>,
    @InjectRepository(TotalesRetencionFuente, 'operacion') private totalesRetencion: Repository<TotalesRetencionFuente>
  ) { }

  async findAllTipodeRetencion() {
    const tipos_retencion = await this.tipoReteaRepo.find()
    return tipos_retencion;
  }
  //TotalesRetencionFuente

  async create(createRetencionFuenteDto: CreateDetalleRetencionFuenteDto) {

    const existencia = await this.detalleReteaRepo.findOneBy({ documentoId: createRetencionFuenteDto.documentoId })

    if (existencia) {
      Object.assign(existencia, createRetencionFuenteDto);
      return this.detalleReteaRepo.save(existencia);
    } else {
      const newdetallerR = this.detalleReteaRepo.create(createRetencionFuenteDto)
      return this.detalleReteaRepo.save(newdetallerR);
    }

  }

  async busquedaRetencionesGuardadas(empresaId: number, periodo: string) {
    const year = parseInt(periodo.split("-")[0])
    const month = parseInt(periodo.split("-")[1])
    const retencionesEnDocumento = await this.docs_fuente.docsRetencion(empresaId, year, month)


    const retencionesGuardadas = await this.detalleReteaRepo.manager
      .getRepository(DetalleRetencionFuente)
      .createQueryBuilder("detalle_retencion")
      .where("detalle_retencion.empresaId = :empresaId", { empresaId })
      .andWhere("detalle_retencion.periodo = :periodo", { periodo })
      .getMany()

    return { retencionesEnDocumento, retencionesGuardadas };

  }

  async findOne(id: any) {
    const user = await this.detalleReteaRepo.findOneBy(id);
    return user;
  }

  async update(id: any, updateRetencionFuenteDto: UpdateRetencionFuenteDto) {
    const user = await this.detalleReteaRepo.findOneBy(id);
    this.detalleReteaRepo.merge(user, updateRetencionFuenteDto);
    return this.detalleReteaRepo.save(user);
  }

  async remove(id: number) {
    await this.detalleReteaRepo.delete(id);
    return true;
  }


  async generarTotalesRetencion(empresaId: number, periodo: string) {
    const year = parseInt(periodo.split("-")[0])
    const month = parseInt(periodo.split("-")[1])


    let emp = "SELECT * FROM empresas WHERE id = " + empresaId
    const empresa = await this.detalleReteaRepo.query(emp)


    /**
     * esta primera consulta trae los detalles de las retenciones guardadas
     * el cual se sumaran y formaran los totales para generar el formulario 350
     * formulaio de retencion en la fuente
     */
    let query1 = "SELECT * FROM detalle_retencion WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "'"
    const result = await this.detalleReteaRepo.query(query1)



    /**
       * esta segunda consulta es para traer todas las ventas del periodo que sean electronicas
       * con lo cual se calculara la autorretencion en renta
       */
    // FACTURACION

    const facturacion = await this.docs_fuente.facturacionElectronica(empresaId, year, month)



    // NOTA CREDITO
    const notaCredito = await this.docs_fuente.notasCreditoElectronica(empresaId, year, month)


    //  CALCULO DE AUTORRENTA Y RETENCIONES
    var autorrenta = 0;
    var autorrentaBase = 0;
    var baseNotaCredito = 0;

    var baseAutorrentaSumas = 0;

    if (facturacion.length > 0) {
      let sell = 0;
      facturacion.map((venta: any) => {
        sell += venta.neto_gv;
      });
      baseAutorrentaSumas = sell;
      // autorrenta = Math.round((autorrentaBase * ventas[0].autorrenta) / 100);
    }


    if (notaCredito.length > 0) {
      let sell = 0;
      notaCredito.map((nc: any) => {
        sell += nc.neto_gv;
      });
      baseNotaCredito = sell;
    }

    autorrentaBase = baseAutorrentaSumas - baseNotaCredito;



    autorrenta = Math.round((autorrentaBase * empresa[0]?.autorrenta) / 100);



    // arreglo donde se ingresara el los totales de la retencion
    var array: Array<{}> = [];
    /**
     * iterador que sumara el valor de cada tipo de retencion ejemplo todas las retenciones
     * por compras, por honorarios, por servicios, etc
     */



    for (let i = 0; i <= 18; i++) {
      var retencion = 0;
      var base = 0;

      for (let ii = 0; ii < result.length; ii++) {
        if (result[ii].tiporetencionId === i) {
          // console.log(result[ii].tiporetencionId)
          retencion += result[ii].valor;
          base += result[ii].base;
        }
      }

      /**
       * se forma un arreglo de totales que se guardara en otra base de datos para
       * poder generar el formulario 350
       */
      var datoTotal = {
        empresaId,
        periodo,
        tiporetencionId: i,
        base: base,
        valor: retencion,
      };
      // console.log(datoTotal)

      /**
       * en la iteracion se genera valores 0 por que no todo puede existir por se se hace
       * la siguiente validacion para solo ponder en el arreglo vacio inicial
       * solo los valores que tenn valores diferentes a 0
       */

      if (datoTotal.base != 0 && datoTotal.valor != 0) {
        array.push(datoTotal);
        retencion = 0;
        base = 0;
      }
    }



    var autoRent = {
      empresaId,
      periodo,
      tiporetencionId: 16,
      base: autorrentaBase | 0,
      valor: autorrenta | 0,
    };

    // console.log(autoRent)

    array.push(autoRent);



    /**
     * Esto elimina todos los totales de la retencion para volver a generar y actualizar la tabla
    */

    let query4 = "DELETE FROM totales_retencion WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "'"
    const borrar = await this.totalesRetencion.query(query4)


    /**
     * Aqui Vuelvre a guardar las retenciones en los totales
     * listas para generar el reporte formulario 350 de la DIAN
    */

    // console.log(array)
    await this.totalesRetencion
      .createQueryBuilder()
      .insert()
      .into(TotalesRetencionFuente)
      .values(array)
      .execute()


    return true
  }

  async consultaTotalesRetencion(empresaId: number, periodo: string) {

    if (!empresaId || !periodo) return 'no hay informacion';


    let query = "SELECT totales_retencion.*, empresas.razonSocial, empresas.nit, empresas.digitoVerificacion FROM totales_retencion, empresas WHERE empresas.id = totales_retencion.empresaId AND empresaId = " + empresaId + " AND periodo = '" + periodo + "'"
    const totales_retenciones = await this.totalesRetencion.query(query)
    return totales_retenciones;


  }

  async consultaAnexoRetencion(empresaId: number, periodo: string) {
    const year = parseInt(periodo.split("-")[0])
    const month = parseInt(periodo.split("-")[1])
    if (!empresaId || !periodo) return 'no hay informacion';

    //let consulta = "SELECT *, documento.numeroFE, documento.numeroDoc FROM detalle_retencion, tipo_retencion, empresas, documento WHERE documento.id = detalle_retencion.documentoId AND empresas.id = detalle_retencion.empresaId AND tipo_retencion.id = detalle_retencion.tiporetencionId AND empresaId=" + empresaId + " AND periodo = '" + periodo + "'";
    // let consulta = "SELECT *," +
    //   "(SELECT numeroFE FROM documento WHERE documento.id = detalle_retencion.documentoId) as numeroFE, " +
    //   "(SELECT numeroDoc FROM documento WHERE documento.id = detalle_retencion.documentoId) as numeroDoc, " +
    //   "(SELECT nit FROM documento WHERE documento.id = detalle_retencion.documentoId) as nit, " +
    //   "(SELECT razonSocial FROM documento WHERE documento.id = detalle_retencion.documentoId) as razonSocial, " +
    //   "(SELECT nit FROM empresas WHERE empresas.id = detalle_retencion.empresaId) as nitEmpresa, " +
    //   "(SELECT razonSocial FROM empresas WHERE empresas.id = detalle_retencion.empresaId) as razonSocialEmpresa " +
    //   "FROM detalle_retencion, tipo_retencion, empresas " +
    //   "WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "' AND empresas.id = " + empresaId + " AND detalle_retencion.empresaId = " + empresaId + "  AND tipo_retencion.id = detalle_retencion.tiporetencionId"
    // const totales_retenciones = await this.detalleReteaRepo.query(consulta);

    const totales_retencion = await this.docs_fuente.docsRetencion(empresaId, year, month)

    // tipo_retencion
    return totales_retencion;

  }


  async removeByDocumentoId(id: any) {
    let query = "DELETE FROM detalle_retencion WHERE (documentoId = " + id + ");"
    await this.totalesRetencion.query(query);
    return true;
  }







}


