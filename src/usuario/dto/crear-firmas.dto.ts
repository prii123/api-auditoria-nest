import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CrearFirmaDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(1 - 100)
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1 - 100)
    readonly identificacion: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1 - 100)
    readonly cargo: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1 - 100)
    readonly direccion: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly telefono: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly firma: string;

}