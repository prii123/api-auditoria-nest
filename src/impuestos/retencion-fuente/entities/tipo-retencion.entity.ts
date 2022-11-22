import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tipo_retencion'})
export class TipoRetencionFuente {

    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly concepto: string;




}
