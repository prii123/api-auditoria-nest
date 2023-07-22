import { Injectable } from '@nestjs/common';
import { CreateRetencionConfiguracionDto } from './dto/create-retencion-configuracion.dto';
import { UpdateRetencionConfiguracionDto } from './dto/update-retencion-configuracion.dto';
import { RetencionConfiguracionEntity } from './entities/retencion-configuracion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class RetencionConfiguracionService {

  constructor(
    @InjectRepository(RetencionConfiguracionEntity) private configReteRepo: Repository<RetencionConfiguracionEntity>
  ) { }

  async create(createRetencionConfiguracionDto: CreateRetencionConfiguracionDto): Promise<RetencionConfiguracionEntity> {
    const retencionConfiguracion = this.configReteRepo.create(createRetencionConfiguracionDto);
    return await this.configReteRepo.save(retencionConfiguracion);
  }

  async findAll(): Promise<RetencionConfiguracionEntity[]> {
    return await this.configReteRepo.find();
  }

  async findOne(id: any): Promise<RetencionConfiguracionEntity> {
    return await this.configReteRepo.findOneBy({id});
  }

  async update(id: any, updateRetencionConfiguracionDto: UpdateRetencionConfiguracionDto): Promise<RetencionConfiguracionEntity> {
    const retencionConfiguracion = await this.configReteRepo.findOneBy({id});
    if (!retencionConfiguracion) {
      return null; // O puedes lanzar una excepción o un mensaje de error aquí si lo deseas
    }
    Object.assign(retencionConfiguracion, updateRetencionConfiguracionDto);
    return await this.configReteRepo.save(retencionConfiguracion);
  }

  async remove(id: any): Promise<RetencionConfiguracionEntity> {
    const retencionConfiguracion = await this.configReteRepo.findOneBy({id});
    if (!retencionConfiguracion) {
      return null; // O puedes lanzar una excepción o un mensaje de error aquí si lo deseas
    }
    return await this.configReteRepo.remove(retencionConfiguracion);
  }
}
