import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetencionFuenteService } from './retencion-fuente.service';
import { CreateDetalleRetencionFuenteDto } from './dto/detalle-retencion-fuente.dto';
import { UpdateRetencionFuenteDto } from './dto/update-retencion-fuente.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('retencion-fuente')
@Controller('retencion-fuente')
export class RetencionFuenteController {
  constructor(private readonly retencionFuenteService: RetencionFuenteService) {}

  @Post()
  create(@Body() createRetencionFuenteDto: CreateDetalleRetencionFuenteDto) {
    return this.retencionFuenteService.create(createRetencionFuenteDto);
  }

  @Get(':empresaId/:periodo')
  findAll(@Param('empresaId') empresaId: string, @Param('periodo') periodo: string) {
    return this.retencionFuenteService.busquedaRetencionesGuardadas(empresaId, periodo);
  }

  @Get('totales-retencion/:empresaId/:periodo')
  totalesRetenciones(@Param('empresaId') empresaId: string, @Param('periodo') periodo: string) {
    return this.retencionFuenteService.generarTotalesRetencion(empresaId, periodo);
  }

  @Get('/tipos')
  findAllTipoRetencion() {
    return this.retencionFuenteService.findAllTipodeRetencion();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retencionFuenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetencionFuenteDto: UpdateRetencionFuenteDto) {
    return this.retencionFuenteService.update(+id, updateRetencionFuenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retencionFuenteService.remove(+id);
  }
}
