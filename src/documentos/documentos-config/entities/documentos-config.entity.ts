import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tipo_documentos' })
export class DocumentosConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
}