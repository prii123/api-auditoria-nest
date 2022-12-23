import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put, Query, Res, UseGuards, Request, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmpresaDTO } from './dto/empresa.dto';
import { EmpresaService } from './empresa.service';


@ApiBearerAuth()
@ApiTags('empresas')
@Controller('empresas')
export class EmpresaController {
    constructor(private empresaService: EmpresaService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async findAll(@Res() res): Promise<EmpresaDTO> {
        const empresas = await this.empresaService.findAll()
        return res.status(HttpStatus.OK).json({
            message: 'query process Successfully',
            data: empresas
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:empresaID')
    async findOne(@Res() res, @Param('empresaID') empresaID: number) {
        const empresa = await this.empresaService.findOne(empresaID);

        // if( !mongoose.Types.ObjectId.isValid(empresaID) ) throw new NotFoundException('La empresa no existe.');
        return res.status(HttpStatus.OK).json({
            message: 'query process Succesfully',
            data: empresa
        })
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Res() res, @Body() empresaDTO: EmpresaDTO, @Request() req) {
        console.log(req)
        if (!req?.user) return {message: 'logueate primero'}
        const empresa = await this.empresaService.create(empresaDTO, req?.user);
        return res.status(200).json({
            message: 'Empresa Successfully Created',
            data: empresa
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/')
    async remove(@Res() res, @Query('empresaID') empresaID) {
        const empresaDeleted = await this.empresaService.remove(empresaID);
        if (!empresaDeleted) throw new NotFoundException('Empresa does not exist!');

        return res.status(HttpStatus.OK).json({
            message: 'Empresa Deleted Successfully',
            data: empresaDeleted
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:empresaID')
    async update(@Res() res, @Body() empresaDTO: EmpresaDTO, @Param('empresaID') empresaID) {
        const updatedEmpresa = await this.empresaService.update(empresaID, empresaDTO);
        if (!updatedEmpresa) throw new NotFoundException('Empresa does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Empresa Updated Successfully',
            data: updatedEmpresa
        });
    }
}
