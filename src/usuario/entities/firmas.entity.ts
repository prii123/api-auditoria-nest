import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'firmas' })
export class FirmasEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string;

    @Column()
    identificacion: string;

    @Column()
    cargo: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @Column()
    firma: string;

}

