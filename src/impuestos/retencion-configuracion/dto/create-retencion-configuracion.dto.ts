import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateRetencionConfiguracionDto {


    @ApiProperty()
    @IsNotEmpty()
    readonly concepto: string;


}

