import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateHallazgoDto {
    @ApiProperty()
    // @IsNotEmpty()
    // @Length(1-100)
    readonly documentoId: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @Length(1-100)
    readonly tipodocumentoId: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly hallazgo: string;

    @ApiProperty()
    //  @IsNotEmpty()
    readonly accioncorrectiva: string;

    @ApiProperty()
    @IsNotEmpty()
    // @Length(1-100)
    readonly empresaId: number;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1-100)
    readonly periodo:string;


}
