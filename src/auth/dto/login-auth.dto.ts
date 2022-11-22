import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;


  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}