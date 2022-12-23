import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class EmpresaDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(1-100)
    readonly nit: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1-100)
    readonly razonSocial: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1-100)
    readonly digitoVerificacion: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1-100)
    readonly direccion: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1-100)
    readonly ciudad: string;

    @ApiProperty()
    readonly logo: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @Length(0-100)
    readonly autorrenta: number;

    readonly creadorId : number;


}