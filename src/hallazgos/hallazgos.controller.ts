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
  create(@Body() createHallazgoDto: CreateHallazgoDto) {
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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHallazgoDto: UpdateHallazgoDto) {
    return this.hallazgosService.update(+id, updateHallazgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hallazgosService.remove(+id);
  }
}
