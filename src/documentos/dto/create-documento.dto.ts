import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDocumentoDto {

    @IsNotEmpty()
    @IsNumber()
    idEmpresa: number;

    @IsNotEmpty()
    nit: string;

    @IsNotEmpty()
    razonSocial: string;

    @IsNotEmpty()
    tipoDoc: string;

    @IsNotEmpty()
    numeroDoc: string;

    @IsNotEmpty()
    numeroFE: string;

    @IsNotEmpty()
    @IsNumber()
    valorNeto: number;

    @IsNotEmpty()
    @IsNumber()
    impuesto: number;

    @IsNotEmpty()
    @IsNumber()
    reteFuente: number;

    @IsNotEmpty()
    @IsNumber()
    reteIva: number;

    @IsNotEmpty()
    periodo: string;
}
