import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDetalleRetencionFuenteDto {
    @IsNotEmpty()
    @IsNumber()
    readonly tiporetencionId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly empresaId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly documentoId: number;

    @IsNotEmpty()
    readonly periodo: string;

    @IsNotEmpty()
    @IsNumber()
    readonly base: number;

    @IsNotEmpty()
    @IsNumber()
    readonly valor: number;
}
