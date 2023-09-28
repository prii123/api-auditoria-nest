import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuenteDocsService } from './fuente_docs.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('fuente-out')
@Controller('fuente-docs')
export class FuenteDocsController {
  constructor(
    private readonly fuenteDocsService: FuenteDocsService
    ) {}

  @Get('/conceptos/:idEmpresa')
  conceptos(@Param('idEmpresa') id_empresa: number) {
    return this.fuenteDocsService.conceptos(id_empresa);
  }


  @Get('/conciliarCompras')
  conciliarCompras() {
    return this.fuenteDocsService.conciliarCompras();
  }

  @Get('/factura/:idEmpresa/:year/:month')
  factura(@Param('idEmpresa') id_empresa: number, @Param('year') year: number, @Param('month') month: number) {
    return this.fuenteDocsService.factura(id_empresa, year, month);
  }
  @Get('/notaCVentas/:idEmpresa/:year/:month')
  notaCVentas(@Param('idEmpresa') id_empresa: number, @Param('year') year: number, @Param('month') month: number) {
    return this.fuenteDocsService.notaCVentas(id_empresa, year, month);
  }
  @Get('/notaDVentas/:idEmpresa/:year/:month')
  notaDVentas(@Param('idEmpresa') id_empresa: number, @Param('year') year: number, @Param('month') month: number) {
    return this.fuenteDocsService.notaDVentas(id_empresa, year, month);
  }


  @Get('/cuentasPorPagar/:idEmpresa/:year/:month')
  cuentasPorPagar(@Param('idEmpresa') id_empresa: number, @Param('year') year: number, @Param('month') month: number) {
    return this.fuenteDocsService.cuentasPorPagar(id_empresa, year, month);
  }

  @Get('/notaCCompras/:idEmpresa/:year/:month')
  notaCCompras(@Param('idEmpresa') id_empresa: number, @Param('year') year: number, @Param('month') month: number) {
    return this.fuenteDocsService.notaCCompras(id_empresa, year, month);
  }

  @Get('/notaDCompras/:idEmpresa/:year/:month')
  notaDCompras(@Param('idEmpresa') id_empresa: number, @Param('year') year: number, @Param('month') month: number) {
    return this.fuenteDocsService.notaDCompras(id_empresa, year, month);
  }

  @Get('/ordenPagoCont')
  ordenPagoCont() {
    return this.fuenteDocsService.ordenPagoCont();
  }

  @Get('/pagoDirectoCont/:idEmpresa/:year/:month')
  pagoDirectoCont(@Param('idEmpresa') id_empresa: number, @Param('year') year: number, @Param('month') month: number) {
    return this.fuenteDocsService.pagoDirectoCont(id_empresa, year, month);
  }


  @Get('/rCajaCont/:idEmpresa')
  rCajaCont(@Param('idEmpresa') id_empresa: number) {
    return this.fuenteDocsService.rCajaCont(id_empresa);
  }



}
