import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RCajaContDto {
  @IsNumber()
  @ApiProperty()
  id_rcaja_cont: number;

  @IsNumber()
  @ApiProperty()
  id_factura: number;

  @IsNumber()
  @ApiProperty()
  abonoRC: number;

  @IsNumber()
  @ApiProperty()
  id_empresa: number;
}
