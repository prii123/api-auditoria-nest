import { Injectable } from '@nestjs/common';
import { CreateDocumentosConfigDto } from './dto/create-documentos-config.dto';
import { UpdateDocumentosConfigDto } from './dto/update-documentos-config.dto';
import { DocumentosConfig } from './entities/documentos-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentosConfigService {

  constructor(
    @InjectRepository(DocumentosConfig, 'operacion') private docConfRepo: Repository<DocumentosConfig>,

  ) { }

  async create(createDocumentosConfigDto: CreateDocumentosConfigDto): Promise<DocumentosConfig> {
    const documentosConfig = this.docConfRepo.create(createDocumentosConfigDto);
    return await this.docConfRepo.save(documentosConfig);
  }

  async findAll(): Promise<DocumentosConfig[]> {
    return await this.docConfRepo.find();
  }

  async findOne(id: any): Promise<DocumentosConfig> {
    return await this.docConfRepo.findOneBy({id});
  }

  async update(id: any, updateDocumentosConfigDto: UpdateDocumentosConfigDto): Promise<DocumentosConfig> {
    const documentosConfig = await this.docConfRepo.findOneBy({id});
    if (!documentosConfig) {
      return null; // O puedes lanzar una excepción o un mensaje de error aquí si lo deseas
    }
    Object.assign(documentosConfig, updateDocumentosConfigDto);
    return await this.docConfRepo.save(documentosConfig);
  }

  async remove(id: any): Promise<DocumentosConfig> {
    // console.log(id)
    const documentosConfig = await this.docConfRepo.findOneBy({id});
    // console.log(documentosConfig.nombre)
    if (!documentosConfig) {
      return null; // O puedes lanzar una excepción o un mensaje de error aquí si lo deseas
    }
    return await this.docConfRepo.remove(documentosConfig);
  }

}
