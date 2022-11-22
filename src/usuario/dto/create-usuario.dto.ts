import { IsNotEmpty, Length, IsEmail } from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty()
    @Length(1-100)
    readonly name: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly email: string;

    @IsNotEmpty()
    @Length(1-100)
    readonly password: string;

    readonly image_url: string;

    @IsNotEmpty()
    readonly idRol: number;
 
}
