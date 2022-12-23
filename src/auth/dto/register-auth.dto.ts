import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1-100)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1-100)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3-100)
  readonly password: string;

  @ApiProperty()
  readonly image_url: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly idRol: number;
}