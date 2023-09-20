import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuenteDocsService } from './fuente_in.service';
import { CreateFuenteDocDto } from './dto/create-fuente_doc.dto';
import { UpdateFuenteDocDto } from './dto/update-fuente_doc.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('fuente-in')
@Controller('fuente-in')
export class FuenteDocsController {
  constructor(
    private readonly fuenteDocsService: FuenteDocsService
    ) {}

  @Get('/conceptos')
  conceptos() {
    return this.fuenteDocsService.conceptos();
  }


  @Get('/conciliarCompras')
  conciliarCompras() {
    return this.fuenteDocsService.conciliarCompras();
  }

  @Get('/cuentasPorPagar')
  cuentasPorPagar() {
    return this.fuenteDocsService.cuentasPorPagar();
  }

  @Get('/notaCCompras')
  notaCCompras() {
    return this.fuenteDocsService.notaCCompras();
  }

  @Get('/notaDCompras')
  notaDCompras() {
    return this.fuenteDocsService.notaDCompras();
  }

  @Get('/ordenPagoCont')
  ordenPagoCont() {
    return this.fuenteDocsService.ordenPagoCont();
  }

  @Get('/pagoDirectoCont')
  pagoDirectoCont() {
    return this.fuenteDocsService.pagoDirectoCont();
  }


  @Get('/rCajaCont')
  rCajaCont() {
    return this.fuenteDocsService.rCajaCont();
  }



}
