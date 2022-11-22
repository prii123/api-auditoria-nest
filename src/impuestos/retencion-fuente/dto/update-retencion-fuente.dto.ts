import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleRetencionFuenteDto } from './detalle-retencion-fuente.dto';

export class UpdateRetencionFuenteDto extends PartialType(CreateDetalleRetencionFuenteDto) {}
