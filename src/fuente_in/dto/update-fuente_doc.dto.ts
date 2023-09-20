import { PartialType } from '@nestjs/swagger';
import { CreateFuenteDocDto } from './create-fuente_doc.dto';

export class UpdateFuenteDocDto extends PartialType(CreateFuenteDocDto) {}
