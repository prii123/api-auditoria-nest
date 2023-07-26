import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, Request } from '@nestjs/common';
import { FirmaService } from './firma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CrearFirmaDTO } from './dto/crear-firmas.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersEntity } from './entities/usuario.entity';


@ApiBearerAuth()
@ApiTags('firmas')
@Controller('firmas')
export class FirmaController {
  constructor(
    private readonly firmaService: FirmaService
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post('/')
  createFirma(@Body() crearFirma: CrearFirmaDTO) {
    return this.firmaService.crearFirma(crearFirma);
  }




  @UseGuards(JwtAuthGuard)
  @Get('/')
  consultarFir() {
    return this.firmaService.consultarfirmas();
    // return res.status(HttpStatus.OK).json({
    //   message: 'Query process Successfully',
    //   datos
    // })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  consultarFirmaById(@Param('id') id : number) {
    return this.firmaService.consultarfirmasById(+id);

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizarFirmaById(@Param('id') id : number, @Body() crearFirma: CrearFirmaDTO) {
    return this.firmaService.updateFirma(id, crearFirma);

  }

  
}
