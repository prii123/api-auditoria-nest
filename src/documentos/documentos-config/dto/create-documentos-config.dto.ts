import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateDocumentosConfigDto {


    @ApiProperty()
    @IsNotEmpty()
    readonly nombre: string;


}
