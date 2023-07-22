import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetencionConfiguracionService } from './retencion-configuracion.service';
import { CreateRetencionConfiguracionDto } from './dto/create-retencion-configuracion.dto';
import { UpdateRetencionConfiguracionDto } from './dto/update-retencion-configuracion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('retencion-fuente')
@Controller('retencion-configuracion')
export class RetencionConfiguracionController {
  constructor(private readonly retencionConfiguracionService: RetencionConfiguracionService) {}

  @Post()
  create(@Body() createRetencionConfiguracionDto: CreateRetencionConfiguracionDto) {
    return this.retencionConfiguracionService.create(createRetencionConfiguracionDto);
  }

  @Get()
  findAll() {
    return this.retencionConfiguracionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.retencionConfiguracionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRetencionConfiguracionDto: UpdateRetencionConfiguracionDto) {
    return this.retencionConfiguracionService.update(+id, updateRetencionConfiguracionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.retencionConfiguracionService.remove(+id);
  }
}
