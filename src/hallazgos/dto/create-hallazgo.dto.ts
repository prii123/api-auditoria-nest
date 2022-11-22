import { IsNotEmpty, Length } from "class-validator";

export class CreateHallazgoDto {

    @IsNotEmpty()
    @Length(1-100)
    readonly documentoId: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly tipodocumentoId: string;

    @IsNotEmpty()
    readonly hallazgo: string;

     @IsNotEmpty()
    readonly accioncorrectiva: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly empresaId: number;

    @IsNotEmpty()
    @Length(1-100)
    readonly periodo:string;


}
