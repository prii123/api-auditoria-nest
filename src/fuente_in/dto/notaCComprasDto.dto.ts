import { IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotaCComprasDto {
  @IsNumber()
  @ApiProperty()
  idNotaCompra: number;

  @IsNumber()
  @ApiProperty()
  tipo: number;

  @IsNumber()
  @ApiProperty()
  nroNota: number;

  @IsNumber()
  @ApiProperty()
  idCuentaPorPagar: number;

  @IsString()
  @ApiProperty()
  nroConsecutivo: string;

  @IsDate()
  @ApiProperty()
  fechaIni: Date;

  @IsNumber()
  @ApiProperty()
  idUser: number;

  @IsNumber()
  @ApiProperty()
  idUser2: number;

  @IsNumber()
  @ApiProperty()
  idConcepto: number;

  @IsNumber()
  @ApiProperty()
  bruto: number;

  @IsNumber()
  @ApiProperty()
  _descuento: number;

  @IsNumber()
  @ApiProperty()
  descuento: number;

  @IsNumber()
  @ApiProperty()
  netoGv: number;

  @IsNumber()
  @ApiProperty()
  _ipocon: number;

  @IsNumber()
  @ApiProperty()
  ipoconsumo: number;

  @IsNumber()
  @ApiProperty()
  baseIva: number;

  @IsNumber()
  @ApiProperty()
  _iva: number;

  @IsNumber()
  @ApiProperty()
  iva: number;

  @IsNumber()
  @ApiProperty()
  retRenta: number;

  @IsNumber()
  @ApiProperty()
  retIva: number;

  @IsNumber()
  @ApiProperty()
  retIca: number;

  @IsNumber()
  @ApiProperty()
  retCree: number;

  @IsNumber()
  @ApiProperty()
  retOtros: number;

  @IsNumber()
  @ApiProperty()
  retTotal: number;

  @IsNumber()
  @ApiProperty()
  totalCxP: number;

  @IsNumber()
  @ApiProperty()
  aPagar: number;

  @IsNumber()
  @ApiProperty()
  formaPago: number;

  @IsNumber()
  @ApiProperty()
  idCentroC: number;

  @IsNumber()
  @ApiProperty()
  estado: number;

  @IsNumber()
  @ApiProperty()
  id_empresa: number;
}
