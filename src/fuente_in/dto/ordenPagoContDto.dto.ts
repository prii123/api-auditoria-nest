import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrdenPagoContDto {
  @IsNumber()
  @ApiProperty()
  idOrdenPagoCont: number;

  @IsNumber()
  @ApiProperty()
  idCuentaPorPagar: number;

  @IsNumber()
  @ApiProperty()
  abonoOP: number;

  @IsNumber()
  @ApiProperty()
  pagadoOP: number;

  @IsNumber()
  @ApiProperty()
  id_empresa: number;
}
