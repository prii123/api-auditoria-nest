import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';

@ApiBearerAuth()
@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get('/tipo-documentos')
  consultaTipoDocumentos(){
    return this.documentosService.tipoDeDocumentos()
  }

  @Get('/numero-por-cada-documento/:periodo/:empresaId')
  contarCantidadDeDocumentosXPeriodoXEmpresa(@Param('periodo') periodo: string, @Param('empresaId') empresaId: string){
    return this.documentosService.cantidaPorDocumentos(periodo, empresaId)
  }

  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDto[]) {
    return this.documentosService.create(createDocumentoDto);
  }

  @Get(':periodo/:tipoDoc/:empresaId')
  findAll(@Param('periodo') periodo: string, @Param('tipoDoc') tipoDoc: string, @Param('empresaId') empresaId: string) {
    return this.documentosService.findAllByPeriodoTipoDocEmpresaId(periodo, tipoDoc, empresaId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.documentosService.findOne(+id);
  }

  @Delete(':periodo/:tipoDoc/:empresaId')
  removeDocumentos(@Param('periodo') periodo: string, @Param('tipoDoc') tipoDoc: string, @Param('empresaId') empresaId: string) {
    return this.documentosService.removeDocumentos(periodo, tipoDoc, empresaId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.documentosService.remove(id);
  }

  @Patch(':id')
  actualizarHallazgoDocumento(@Param('id') id: number, @Body() update: any) {
    return this.documentosService.actualizarHa(id, update);
  }



  // de qui van el tipo de documento

}
