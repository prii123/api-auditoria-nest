import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name: 'detalle_retencion'})
export class Informe {


    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly empresaId: number;

    @Column()
    readonly tipoDoc: number;

    @Column()
    readonly idCreador: number;

    @Column()
    readonly periodo: string;

    @Column()
    readonly valMax: number;

    @Column()
    readonly valMin: number;




}

