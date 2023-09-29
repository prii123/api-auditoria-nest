import { Injectable } from '@nestjs/common';
import { CreateFuenteDocDto } from './dto/create-fuente_doc.dto';
import { UpdateFuenteDocDto } from './dto/update-fuente_doc.dto';
import { ConceptosEntity } from './entities/conceptos.entity';
import { Raw, Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConciliarComprasContEntity } from './entities/conciliarComprasCont.entity';
import { CuentasPorPagarEntity } from './entities/cuentasPorPagar.entity';
import { NotaCComprasEntity } from './entities/notaCCompras.entity';
import { NotaDComprasEntity } from './entities/notaDCompras.entity';
import { OrdenPagoContEntity } from './entities/ordenPagoCont.entity';
import { PagoDirectoContEntity } from './entities/pagoDirectoCont.entity';
import { RCajaContEntity } from './entities/rcaja_cont.entity';
import { FacturaEntity } from './entities/factura.entity';
import { NotaCVentasEntity } from './entities/notaCVentas.entity';
import { NotaDVentasEntity } from './entities/notaDVentas.entity';

@Injectable()
export class FuenteDocsService {

  constructor(
    @InjectRepository(ConceptosEntity, 'fuente') private conceptosEntity: Repository<ConceptosEntity>,
    @InjectRepository(ConciliarComprasContEntity, 'fuente') private conciliarComprasContEntity: Repository<ConciliarComprasContEntity>,
    @InjectRepository(CuentasPorPagarEntity, 'fuente') private cuentasPorPagarEntity: Repository<CuentasPorPagarEntity>,
    @InjectRepository(NotaCComprasEntity, 'fuente') private notaCComprasEntity: Repository<NotaCComprasEntity>,
    @InjectRepository(NotaDComprasEntity, 'fuente') private notaDComprasEntity: Repository<NotaDComprasEntity>,
    @InjectRepository(OrdenPagoContEntity, 'fuente') private ordenPagoContEntity: Repository<OrdenPagoContEntity>,
    @InjectRepository(PagoDirectoContEntity, 'fuente') private pagoDirectoContEntity: Repository<PagoDirectoContEntity>,
    @InjectRepository(RCajaContEntity, 'fuente') private rCajaContEntity: Repository<RCajaContEntity>,
    @InjectRepository(FacturaEntity, 'fuente') private facturaEntity: Repository<FacturaEntity>,
    @InjectRepository(NotaCVentasEntity, 'fuente') private notaCVentasEntity: Repository<NotaCVentasEntity>,
    @InjectRepository(NotaDVentasEntity, 'fuente') private notaDVentasEntity: Repository<NotaDVentasEntity>,


  ) { }


 

  async factura(id_empresa: number, year: number, month: number) {
    return await this.facturaEntity.find({
      where: {
        id_empresa,
        fecha_ini: Raw(alias => `DATE_FORMAT(${alias}, '%Y-%m') = '${year}-${month}'`)
      }
    });
  }
  async notaCVentas(id_empresa: number, year: number, month: number) {
    return await this.notaCVentasEntity.find({
      where: {
        id_empresa,
        fecha_ini: Raw(alias => `DATE_FORMAT(${alias}, '%Y-%m') = '${year}-${month}'`)
      }
    });
  }
  async notaDVentas(id_empresa: number, year: number, month: number) {
    return await this.notaDVentasEntity.find({
      where: {
        id_empresa,
        fecha_ini: Raw(alias => `DATE_FORMAT(${alias}, '%Y-%m') = '${year}-${month}'`)
      }
    });
  }

  async conceptos(id_empresa: number): Promise<ConceptosEntity[]> {
    return await this.conceptosEntity.find({ where: { id_empresa } });
  }

  async conciliarCompras(): Promise<ConciliarComprasContEntity[]> {
    return await this.conciliarComprasContEntity.find();
  }


  async cuentasPorPagar(id_empresa: number, year: number, month: number) {

    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

    const query = `
    SELECT *
    FROM cuentasporpagar
    JOIN proveedores ON cuentasporpagar.idProveedor = proveedores.id_proveedor
    WHERE cuentasporpagar.id_empresa = ${id_empresa}
    AND DATE_FORMAT(cuentasporpagar.fechaIni, '%Y-%m') = '${yearMonth}'
  `;

    // console.log(query)

    const cuentasPorPagar = await this.cuentasPorPagarEntity.query(query);

    return cuentasPorPagar;

  }

  async notaCCompras(id_empresa: number, year: number, month: number): Promise<NotaCComprasEntity[]> {
    return await this.notaCComprasEntity.find({
      where: {
        id_empresa,
        fechaIni: Raw(alias => `DATE_FORMAT(${alias}, '%Y-%m') = '${year}-${month}'`)
      }
    });
    //return await this.notaCComprasEntity.find();
  }

  async notaDCompras(id_empresa: number, year: number, month: number): Promise<NotaDComprasEntity[]> {
    return await this.notaDComprasEntity.find({
      where: {
        id_empresa,
        fechaIni: Raw(alias => `DATE_FORMAT(${alias}, '%Y-%m') = '${year}-${month}'`)
      }
    });
    //return await this.notaDComprasEntity.find();
  }

  async ordenPagoCont(): Promise<OrdenPagoContEntity[]> {
    return await this.ordenPagoContEntity.find();
  }

  async pagoDirectoCont(id_empresa: number, year: number, month: number): Promise<PagoDirectoContEntity[]> {
    return await this.pagoDirectoContEntity.find({
      where: {
        id_empresa,
        fechaPago: Raw(alias => `DATE_FORMAT(${alias}, '%Y-%m') = '${year}-${month}'`)
      }
    });
    //return await this.pagoDirectoContEntity.find();
  }

  async rCajaCont(id_empresa: number): Promise<RCajaContEntity[]> {
    return await this.rCajaContEntity.find({ where: { id_empresa } });
  }




  /**
   *
   * @returns   servicios para otros modulos
   */




  async minimosYmaximos(id_empresa: number, year: number, month: number) {
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

    const cuentaPorPagar0 = `
      SELECT MIN(nroCuenta) AS min, MAX(nroCuenta) AS max
      FROM cuentasporpagar
      WHERE cuentasporpagar.id_empresa = ${id_empresa}
      AND DATE_FORMAT(cuentasporpagar.fechaIni, '%Y-%m') = '${yearMonth}'
    `;
    const cuentaPorPagar = await this.cuentasPorPagarEntity.query(cuentaPorPagar0);

    const factura0 = `
      SELECT MIN(nro_factura) AS min, MAX(nro_factura) AS max
      FROM factura
      WHERE factura.id_empresa = ${id_empresa}
      AND DATE_FORMAT(factura.fecha_ini, '%Y-%m') = '${yearMonth}'
    `;
    const factura = await this.cuentasPorPagarEntity.query(factura0);


    const notaCCompra0 = `
      SELECT MIN(nroConsecutivo) AS min, MAX(nroConsecutivo) AS max
      FROM notadcompras
      WHERE notadcompras.id_empresa = ${id_empresa}
      AND DATE_FORMAT(notadcompras.fechaIni, '%Y-%m') = '${yearMonth}'
    `;
    const notaCCompra = await this.cuentasPorPagarEntity.query(notaCCompra0);

    const notaCVenta0 = `
      SELECT CAST(MIN(nro_nota) AS UNSIGNED) AS min, CAST(MAX(nro_nota) AS UNSIGNED) AS max
      FROM notacventas
      WHERE notacventas.id_empresa = ${id_empresa}
      AND DATE_FORMAT(notacventas.fecha_ini, '%Y-%m') = '${yearMonth}'
    `;
    const notaCVenta = await this.cuentasPorPagarEntity.query(notaCVenta0);

    const notaDCompra0 = `
      SELECT MIN(nroConsecutivo) AS min, MAX(nroConsecutivo) AS max
      FROM notadcompras
      WHERE notadcompras.id_empresa = ${id_empresa}
      AND DATE_FORMAT(notadcompras.fechaIni, '%Y-%m') = '${yearMonth}'
    `;
    const notaDCompra = await this.cuentasPorPagarEntity.query(notaDCompra0);

    const notaDVenta0 = `
      SELECT MIN(nro_nota) AS min, MAX(nro_nota) AS max
      FROM notadventas
      WHERE notadventas.id_empresa = ${id_empresa}
      AND DATE_FORMAT(notadventas.fecha_ini, '%Y-%m') = '${yearMonth}'
    `;
    const notaDVenta = await this.cuentasPorPagarEntity.query(notaDVenta0);

    const pagoDirecto0 = `
      SELECT MIN(nroPagoDirecto) AS min, MAX(nroPagoDirecto) AS max
      FROM pagodirectocont
      WHERE pagodirectocont.id_empresa = ${id_empresa}
      AND DATE_FORMAT(pagodirectocont.fechaIni, '%Y-%m') = '${yearMonth}'
    `;
    const pagoDirecto = await this.cuentasPorPagarEntity.query(pagoDirecto0);


    const minimosYmaximos = {
      cuentaPorPagar: cuentaPorPagar[0],
      factura: factura[0],
      notaCCompra: notaCCompra[0],
      notaCVenta: notaCVenta[0],
      notaDCompra:notaDCompra[0],
      notaDVenta:notaDVenta[0],
      pagoDirecto: pagoDirecto[0]
    }


    return minimosYmaximos;
  }

  async periodos() {
    // const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

    const periodo = `
      SELECT DISTINCT DATE_FORMAT(cuentasporpagar.fechaIni, '%Y-%m') AS periodo FROM cuentasporpagar ORDER BY fechaIni DESC
    `;
    const periodos = await this.cuentasPorPagarEntity.query(periodo);



    return periodos;
  }


  async docsRetencion(id_empresa: number, year: number, month: number){
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

    const query = `
      SELECT * FROM cuentasporpagar
      JOIN proveedores ON cuentasporpagar.idProveedor = proveedores.id_proveedor
      WHERE (cuentasporpagar.retRenta > 0 OR cuentasporpagar.retIva > 0) AND
      cuentasporpagar.estado = 1 AND
      cuentasporpagar.id_empresa = ${id_empresa}
      AND DATE_FORMAT(cuentasporpagar.fechaIni, '%Y-%m') = '${yearMonth}'
   `
      return await this.cuentasPorPagarEntity.query(query)
  }


  async facturacionElectronica(id_empresa: number, year: number, month: number){
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

    const query = `
      SELECT * FROM factura
      WHERE fe_number <> 'NULL' AND
      factura.estado = 1 AND
      factura.id_empresa = ${id_empresa}
      AND DATE_FORMAT(factura.fecha_ini, '%Y-%m') = '${yearMonth}'
   `
      return await this.cuentasPorPagarEntity.query(query)
  }

  async notasCreditoElectronica(id_empresa: number, year: number, month: number){
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

    const query = `
      SELECT * FROM notacventas
      WHERE fe_number <> 'NULL' AND
      notacventas.estado = 1 AND
      notacventas.id_empresa = ${id_empresa}
      AND DATE_FORMAT(notacventas.fecha_ini, '%Y-%m') = '${yearMonth}'
   `
      return await this.cuentasPorPagarEntity.query(query)
  }




}
