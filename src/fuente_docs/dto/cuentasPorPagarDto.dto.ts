import { IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CuentasPorPagarDto {
  @IsNumber()
  @ApiProperty()
  idCuentaPorPagar: number;

  @IsNumber()
  @ApiProperty()
  nroCuenta: number;

  @IsString()
  @ApiProperty()
  nroFactura: string;

  @IsDate()
  @ApiProperty()
  fechaIni: Date;

  @IsNumber()
  @ApiProperty()
  idUser: number;

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
  ipoconsumo: number;

  @IsNumber()
  @ApiProperty()
  iva: number;

  @IsNumber()
  @ApiProperty()
  totalCxP: number;

  @IsNumber()
  @ApiProperty()
  _rrenta: number;

  @IsNumber()
  @ApiProperty()
  retRenta: number;

  @IsNumber()
  @ApiProperty()
  _riva: number;

  @IsNumber()
  @ApiProperty()
  retIva: number;

  @IsNumber()
  @ApiProperty()
  _rica: number;

  @IsNumber()
  @ApiProperty()
  retIca: number;

  @IsNumber()
  @ApiProperty()
  _rcree: number;

  @IsNumber()
  @ApiProperty()
  retCree: number;

  @IsNumber()
  @ApiProperty()
  _rotros: number;

  @IsNumber()
  @ApiProperty()
  retOtros: number;

  @IsNumber()
  @ApiProperty()
  retTotal: number;

  @IsNumber()
  @ApiProperty()
  aPagar: number;

  @IsNumber()
  @ApiProperty()
  idConcepto: number;

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
