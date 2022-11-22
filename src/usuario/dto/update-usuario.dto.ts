import { IsNotEmpty, Length, IsEmail } from "class-validator";

export class UpdateUsuarioDto {

    @IsNotEmpty()
    @Length(1-100)
    readonly name: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly email: string;

    readonly image_url: string;

    @IsNotEmpty()
    readonly idRol: number;

}
