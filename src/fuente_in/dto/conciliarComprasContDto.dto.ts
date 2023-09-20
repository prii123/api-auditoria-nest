import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConciliarComprasContDto {
  @IsNumber()
  @ApiProperty()
  idConciliarComprasCont: number;

  @IsNumber()
  @ApiProperty()
  idCuentaPorPagar: number;

  @IsNumber()
  @ApiProperty()
  abonoCC: number;

  @IsNumber()
  @ApiProperty()
  pagadoCC: number;

  @IsNumber()
  @ApiProperty()
  id_empresa: number;
}
