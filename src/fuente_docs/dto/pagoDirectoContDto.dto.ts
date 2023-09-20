import { IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PagoDirectoContDto {
  @IsNumber()
  @ApiProperty()
  idPagoDirectoCont: number;

  @IsNumber()
  @ApiProperty()
  idPagoDirecto: number;

  @IsNumber()
  @ApiProperty()
  nroPagoDirecto: number;

  @IsDate()
  @ApiProperty()
  fechaPago: Date;

  @IsNumber()
  @ApiProperty()
  idUser: number;

  @IsNumber()
  @ApiProperty()
  estado: number;

  @IsNumber()
  @ApiProperty()
  idConcepto: number;

  @IsNumber()
  @ApiProperty()
  idFactura: number;

  @IsNumber()
  @ApiProperty()
  idCentroC: number;

  @IsString()
  @ApiProperty()
  documento: string;

  @IsNumber()
  @ApiProperty()
  abono: number;

  @IsNumber()
  @ApiProperty()
  descuento: number;

  @IsNumber()
  @ApiProperty()
  iva: number;

  @IsNumber()
  @ApiProperty()
  ipoconsumo: number;

  @IsNumber()
  @ApiProperty()
  pagado: number;

  @IsNumber()
  @ApiProperty()
  id_empresa: number;
}
