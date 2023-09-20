import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConceptosDto {
  @IsNumber()
  @ApiProperty()
  id_concepto: number;

  @IsString()
  @ApiProperty()
  cod_concepto: string;

  @IsString()
  @ApiProperty()
  nom_concepto: string;

  @IsString()
  @ApiProperty()
  abreviado: string;

  @IsNumber()
  @ApiProperty()
  id_fuente: number;

  @IsNumber()
  @ApiProperty()
  formulario: number;

  @IsString()
  @ApiProperty()
  id_empresa: string;
}
