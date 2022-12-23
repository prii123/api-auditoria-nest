import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateDetalleRetencionFuenteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly tiporetencionId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly empresaId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly documentoId: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly periodo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly base: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly valor: number;
}
