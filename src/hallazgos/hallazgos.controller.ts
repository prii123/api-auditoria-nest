import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HallazgosService } from './hallazgos.service';
import { CreateHallazgoDto } from './dto/create-hallazgo.dto';
import { UpdateHallazgoDto } from './dto/update-hallazgo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('hallazgos')
@Controller('hallazgos')
export class HallazgosController {
  constructor(private readonly hallazgosService: HallazgosService) {}

  @Post()
  consultarPeriodos(@Body() createHallazgoDto: CreateHallazgoDto) {
    return this.hallazgosService.create(createHallazgoDto);
  }

  @Get()
  findAll() {
    return this.hallazgosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hallazgosService.findOne(+id);
  }

  @Get('/documento-id/:id')
  findOnePorDocumentoId(@Param('id') id: number) {
    return this.hallazgosService.buscaPorDocumentoId(+id);
  }

  @Get(':periodo/:empresaId')
  searchByPeriodoAndEmpresaId(@Param('periodo') periodo: string, @Param('empresaId') empresaId: number){
    return this.hallazgosService.findByEmpresaidAndPeriodo(empresaId, periodo)
  }

  @Get('generales/:periodo/:empresaId')
  searchByPeriodoAndEmpresaIdGenerales(@Param('periodo') periodo: string, @Param('empresaId') empresaId: number){
    return this.hallazgosService.findByEmpresaidAndPeriodoGenerales(empresaId, periodo)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHallazgoDto: UpdateHallazgoDto) {
    return this.hallazgosService.update(+id, updateHallazgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hallazgosService.remove(+id);
  }

  
}
