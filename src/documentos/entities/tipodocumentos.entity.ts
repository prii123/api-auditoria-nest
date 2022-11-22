import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'documento' })
export class DocumentoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    concepto: string;

}