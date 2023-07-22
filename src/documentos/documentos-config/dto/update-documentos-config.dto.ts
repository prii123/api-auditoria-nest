import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentosConfigDto } from './create-documentos-config.dto';

export class UpdateDocumentosConfigDto extends PartialType(CreateDocumentosConfigDto) {}
