import { PartialType } from '@nestjs/mapped-types';
import { CreateRetencionConfiguracionDto } from './create-retencion-configuracion.dto';

export class UpdateRetencionConfiguracionDto extends PartialType(CreateRetencionConfiguracionDto) {}
