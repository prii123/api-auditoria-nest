import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(1 - 100)
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Length(1 - 100)
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1 - 100)
    readonly password: string;

    @ApiProperty()
    readonly image_url: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly idRol: number;

}
