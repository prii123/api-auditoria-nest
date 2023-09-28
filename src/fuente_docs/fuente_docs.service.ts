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




}
