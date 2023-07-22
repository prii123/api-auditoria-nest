import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipo_retencion' })
export class RetencionConfiguracionEntity {

    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly concepto: string;

}