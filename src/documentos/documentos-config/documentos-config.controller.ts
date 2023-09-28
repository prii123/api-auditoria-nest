import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentosConfigService } from './documentos-config.service';
import { CreateDocumentosConfigDto } from './dto/create-documentos-config.dto';
import { UpdateDocumentosConfigDto } from './dto/update-documentos-config.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('documentos-config')
export class DocumentosConfigController {
  constructor(private readonly documentosConfigService: DocumentosConfigService) {}

  @Post()
  create(@Body() createDocumentosConfigDto: CreateDocumentosConfigDto) {
    return this.documentosConfigService.create(createDocumentosConfigDto);
  }

  @Get()
  findAll() {
    return this.documentosConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosConfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentosConfigDto: UpdateDocumentosConfigDto) {
    return this.documentosConfigService.update(+id, updateDocumentosConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosConfigService.remove(+id);
  }
}
