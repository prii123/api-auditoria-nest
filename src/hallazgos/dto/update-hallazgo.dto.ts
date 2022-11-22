import { PartialType } from '@nestjs/swagger';
import { CreateHallazgoDto } from './create-hallazgo.dto';

export class UpdateHallazgoDto extends PartialType(CreateHallazgoDto) {}
