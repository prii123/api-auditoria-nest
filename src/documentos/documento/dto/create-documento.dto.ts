import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    idEmpresa: number;

    @ApiProperty()
    @IsNotEmpty()
    nit: string;

    @ApiProperty()
    @IsNotEmpty()
    razonSocial: string;

    @ApiProperty()
    @IsNotEmpty()
    tipoDoc: string;

    @ApiProperty()
    @IsNotEmpty()
    numeroDoc: string;

    @ApiProperty()
    @IsNotEmpty()
    numeroFE: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    valorNeto: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    impuesto: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    reteFuente: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    reteIva: number;

    @ApiProperty()
    @IsNotEmpty()
    periodo: string;
}
