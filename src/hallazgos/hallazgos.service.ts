import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHallazgoDto } from './dto/create-hallazgo.dto';
import { UpdateHallazgoDto } from './dto/update-hallazgo.dto';
import { Hallazgo } from './entities/hallazgo.entity';

@Injectable()
export class HallazgosService {
  constructor( @InjectRepository(Hallazgo) private hallazgosRepo: Repository<Hallazgo>) {}


  create(createHallazgoDto: CreateHallazgoDto) {
    const newHallazgo = this.hallazgosRepo.create(createHallazgoDto);
    return this.hallazgosRepo.save(newHallazgo);
  }

  async findAll() {
    const users = await this.hallazgosRepo.find()
    return users;
  }

  async findOne(id: any) {
    const user = await this.hallazgosRepo.findOneBy(id);
    return user;
  }

  async update(id: any, updateHallazgoDto: UpdateHallazgoDto) {
    const user = await this.hallazgosRepo.findOneBy(id);
    this.hallazgosRepo.merge(user,updateHallazgoDto);
    return this.hallazgosRepo.save(user);
  }

  async remove(id: any) {
    await this.hallazgosRepo.delete(id);
    return true;
  }
}
