import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInformeDto {

    @IsNotEmpty()
    @IsNumber()
    empresaId: number;

    @IsNotEmpty()
    @IsNumber()
    tipoDoc: number;

    @IsNotEmpty()
    @IsNumber()
    idCreador: number;

    @IsNotEmpty()
    periodo: string;

    @IsNotEmpty()
    @IsNumber()
    valMax: number;

    @IsNotEmpty()
    @IsNumber()
    valMin: number;
}
