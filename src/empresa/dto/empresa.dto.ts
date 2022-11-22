import { IsNotEmpty, Length } from "class-validator";

export class EmpresaDTO {

    @IsNotEmpty()
    @Length(1-100)
    readonly nit: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly razonSocial: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly digitoVerificacion: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly direccion: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly ciudad: string;

    readonly logo: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly autorrenta: number;


}