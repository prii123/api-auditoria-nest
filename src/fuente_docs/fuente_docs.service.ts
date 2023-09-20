import { Injectable } from '@nestjs/common';
import { CreateFuenteDocDto } from './dto/create-fuente_doc.dto';
import { UpdateFuenteDocDto } from './dto/update-fuente_doc.dto';
import { ConceptosEntity } from './entities/conceptos.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConciliarComprasContEntity } from './entities/conciliarComprasCont.entity';
import { CuentasPorPagarEntity } from './entities/cuentasPorPagar.entity';
import { NotaCComprasEntity } from './entities/notaCCompras.entity';
import { NotaDComprasEntity } from './entities/notaDCompras.entity';
import { OrdenPagoContEntity } from './entities/ordenPagoCont.entity';
import { PagoDirectoContEntity } from './entities/pagoDirectoCont.entity';
import { RCajaContEntity } from './entities/rcaja_cont.entity';

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


  ) { }

  async conceptos(): Promise<ConceptosEntity[]> {
    return this.conceptosEntity.find();
  }

  async conciliarCompras(): Promise<ConciliarComprasContEntity[]> {
    return this.conciliarComprasContEntity.find();
  }

  async cuentasPorPagar(): Promise<CuentasPorPagarEntity[]> {
    return this.cuentasPorPagarEntity.find();
  }

  async notaCCompras(): Promise<NotaCComprasEntity[]> {
    return this.notaCComprasEntity.find();
  }

  async notaDCompras(): Promise<NotaDComprasEntity[]> {
    return this.notaDComprasEntity.find();
  }

  async ordenPagoCont(): Promise<OrdenPagoContEntity[]> {
    return this.ordenPagoContEntity.find();
  }

  async pagoDirectoCont(): Promise<PagoDirectoContEntity[]> {
    return this.pagoDirectoContEntity.find();
  }

  async rCajaCont(): Promise<RCajaContEntity[]> {
    return this.rCajaContEntity.find();
  }




}
