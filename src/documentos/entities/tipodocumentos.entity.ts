import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipo_documentos' })
export class TipoDocumentoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

}