import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { InformesService } from './informes.service';
import { CreateInformeDto } from './dto/create-informe.dto';
import { UpdateInformeDto } from './dto/update-informe.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('informes')
@Controller('informes')
export class InformesController {
  constructor(private readonly informesService: InformesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('periodos-por-empresa:empresaId')
  consultarPeriodos(@Param('empresaId') empresaId: number) {
    return this.informesService.consultarPeriodosPorEmpresa(empresaId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('periodos-por-usuario')
  periodosPorUsuario(@Request() req) {
    console.log(req.user)
    // if (!req?.user) return 'logueate primero'
    return this.informesService.periodosPorUsuario(req?.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('empresas-por-periodo/:periodo')
  empresasPorPeriodo(@Param('periodo') periodo: string, @Request() req){
    if (!req?.user) return 'logueate primero'
    return this.informesService.empresasPorPeriodo(periodo, req?.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('consulta-hallazgos/:empresaId/:periodo')
  consultaHallazgos(@Param('empresaId') empresaId: number, @Param('periodo') periodo: string) {
    return this.informesService.consultaHallazgos(empresaId, periodo);
  }

  // PreparaElInforme
  @UseGuards(JwtAuthGuard)
  @Get('consultar/:empresaId/:periodo')
  datosParaElInforme(@Param('empresaId') empresaId: number, @Param('periodo') periodo: string) {
    return this.informesService.datosParaElInforme(empresaId, periodo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preparar/:empresaId/:periodo')
  PreparaElInforme(@Param('empresaId') empresaId: number, @Param('periodo') periodo: string, @Request() req) {
    if (!req?.user) return 'logueate primero'
    return this.informesService.preparaElInforme(empresaId, periodo, req?.user);
  }


}
