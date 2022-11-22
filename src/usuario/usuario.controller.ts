import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  // @UseGuards(JwtAuthGuard)
  @Get('/active')
  findActive(@Req() req) {
    const {_id, name, email, foto, createdAt} = req.user
    return {_id, name, email, foto, createdAt}
  }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   return this.usuarioService.create(createUsuarioDto);
  // }


  // @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll(@Res() res) {
    const usuarios = await this.usuarioService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Query process Successfully',
      usuarios
    })
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('actualiza-datos/:id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(+id);
  }
}
