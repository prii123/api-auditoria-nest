import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetalleRetencionFuenteDto } from './dto/detalle-retencion-fuente.dto';
import { UpdateRetencionFuenteDto } from './dto/update-retencion-fuente.dto';
import { DetalleRetencionFuente } from './entities/retencion-fuente.entity';
import { TipoRetencionFuente } from './entities/tipo-retencion.entity';
import { DocumentoEntity } from '../../documentos/entities/documento.entity'
import { TotalesRetencionFuente } from './entities/totales-retencion.entity';
import { EmpresasEntity } from 'src/empresa/entities/empresas.entity';

@Injectable()
export class RetencionFuenteService {

  constructor(
    @InjectRepository(DetalleRetencionFuente) private detalleReteaRepo: Repository<DetalleRetencionFuente>,
    @InjectRepository(TipoRetencionFuente) private tipoReteaRepo: Repository<TipoRetencionFuente>,
    @InjectRepository(DocumentoEntity) private documentos: Repository<DocumentoEntity>,
    @InjectRepository(TotalesRetencionFuente) private totalesRetencion: Repository<TotalesRetencionFuente>
  ) { }

  async findAllTipodeRetencion() {
    const tipos_retencion = await this.tipoReteaRepo.find()
    return tipos_retencion;
  }
  //TotalesRetencionFuente

  create(createRetencionFuenteDto: CreateDetalleRetencionFuenteDto) {
    const newdetallerR = this.detalleReteaRepo.create(createRetencionFuenteDto)
    return this.detalleReteaRepo.save(newdetallerR);
  }

  async busquedaRetencionesGuardadas(empresaId: number, periodo: string) {
    const retencionesEnDocumento = await this.documentos.manager
      .getRepository(DocumentoEntity)
      .createQueryBuilder("documento")
      .where("documento.reteFuente > :cero", { cero: 0 })
      .andWhere("documento.empresaId = :empresaId", { empresaId })
      .andWhere("documento.periodo = :periodo", { periodo })
      .getMany()


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
    /**
     * esta primera consulta trae los detalles de las retenciones guardadas
     * el cual se sumaran y formaran los totales para generar el formulario 350
     * formulaio de retencion en la fuente
     */
    let query1 = "SELECT * FROM detalle_retencion WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "'"
    const result = await this.detalleReteaRepo.query(query1)
    // .manager
    // .getRepository(DetalleRetencionFuente)
    // .createQueryBuilder("detalle_retencion")
    // .where("detalle_retencion.empresaId = :empresaId", { empresaId })
    // .andWhere("detalle_retencion.periodo = :periodo", { periodo })
    // .getMany()
    

    /**
       * esta segunda consulta es para traer todas las ventas del periodo que sean electronicas
       * con lo cual se calculara la autorretencion en renta
       */
    // FACTURACION
    let query2 = "SELECT empresas.autorrenta, documento.*, empresas.razonSocial FROM empresas, documento WHERE empresas.id = documento.empresaId AND documento.numeroFE IS NOT NULL AND documento.empresaId = " + empresaId + " AND documento.periodo = '" + periodo + "' AND tipoDoc = 2"
    const ventas = await this.documentos.query(query2)
    // .manager
    // .getRepository(DocumentoEntity)
    // .createQueryBuilder("documento")
    // .leftJoinAndSelect("documento.empresa", "empresas.documentos")
    // .where("documento.empresaId = :empresaId", { empresaId })
    // .andWhere("documento.periodo = :periodo", { periodo })
    // .andWhere("tipoDoc = 2")
    // .andWhere("documento.numeroFE IS NOT NULL")
    // .getMany()

    

    // NOTA CREDITO
    let query3 = "SELECT empresas.autorrenta, documento.*, empresas.razonSocial FROM empresas, documento WHERE empresas.id = documento.empresaId AND documento.numeroFE IS NOT NULL AND documento.empresaId = " + empresaId + " AND documento.periodo = '" + periodo + "' AND tipoDoc = 3"
    const notaCredito = await this.documentos.query(query3)
    // .manager
    // .getRepository(DocumentoEntity)
    // .createQueryBuilder("documento")
    // .leftJoinAndSelect("documento.empresa", "empresas.documentos")
    // .where("documento.empresaId = :empresaId", { empresaId })
    // .andWhere("documento.periodo = :periodo", { periodo })
    // .andWhere("tipoDoc = 3")
    // .andWhere("documento.numeroFE IS NOT NULL")
    // .getMany()
    

    //  CALCULO DE AUTORRENTA Y RETENCIONES
    var autorrenta = 0;
    var autorrentaBase = 0;
    var baseNotaCredito = 0;

    var baseAutorrentaSumas = 0;

    if (ventas.length > 0) {
      let sell = 0;
      ventas.map((venta: any) => {
        sell += venta.valorNeto;
      });
      baseAutorrentaSumas = sell;
      // autorrenta = Math.round((autorrentaBase * ventas[0].autorrenta) / 100);
    }

    if (notaCredito.length > 0) {
      let sell = 0;
      notaCredito.map((nc: any) => {
        sell += nc.valorNeto;
      });
      baseNotaCredito = sell;
    }

    autorrentaBase = baseAutorrentaSumas - baseNotaCredito;

    autorrenta = Math.round((autorrentaBase * ventas[0]?.autorrenta) / 100);

    // console.log(ventas[0]?.empresa?.autorrenta);
    // console.log(ventas[0]);
    // console.log(baseAutorrentaSumas + "  -  " + baseNotaCredito);
    // console.log(autorrenta);
    // console.log(autorrentaBase);

    // arreglo donde se ingresara el los totales de la retencion
    var array: Array<{}> = [];
    /**
     * iterador que sumara el valor de cada tipo de retencion ejemplo todas las retenciones
     * por compras, por honorarios, por servicios, etc
     */



    for (let i = 0; i <= 18; i++) {
      var retencion = 0;
      var base = 0;
      // map utiliazdo para sumar cada tipo de elemento
      // result.map((ret:any) => {
      //   if (ret.tiporetencionId === i) {
      //     retencion += ret.valor;
      //     base += ret.base;
      //   }
      // });
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

    array.push(autoRent);

  

    /**
     * Esto elimina todos los totales de la retencion para volver a generar y actualizar la tabla
    */

    let query4 = "DELETE FROM totales_retencion WHERE empresaId = " + empresaId + " AND periodo = '" + periodo + "'"
    const borrar = await this.totalesRetencion.query(query4)
    // .createQueryBuilder('totales_retencion')
    // .delete()
    // .from(TotalesRetencionFuente)
    // .where("totales_retencion.empresaId = :empresaId", { empresaId })
    // .andWhere("totales_retencion.periodo = :periodo", { periodo })
    // .execute();

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

    // const totales_retenciones = await this.totalesRetencion.find({
    //   relations: ['empresa', 'tiporetencion'], where: {
    //     empresaId: empresaId,
    //     periodo: periodo,
    //   },
    // });
    let query = "SELECT totales_retencion.*, empresas.razonSocial, empresas.nit, empresas.digitoVerificacion FROM totales_retencion, empresas WHERE empresas.id = totales_retencion.empresaId AND empresaId = " + empresaId + " AND periodo = '" + periodo + "'"
    const totales_retenciones = await this.totalesRetencion.query(query)
    return totales_retenciones;


  }

  async consultaAnexoRetencion(empresaId: number, periodo: string) {

    if (!empresaId || !periodo) return 'no hay informacion';

    const totales_retenciones = await this.detalleReteaRepo.find({
      relations: ['empresa', 'documento', 'tiporetencion'], where: {
        empresaId: empresaId,
        periodo: periodo,
      },
    });




    // tipo_retencion
    return totales_retenciones;

  }


  async removeByDocumentoId(id: any) {
    let query = "DELETE FROM detalle_retencion WHERE (documentoId = "+id+");"
    await this.totalesRetencion.query(query);
    return true;
  }







}


