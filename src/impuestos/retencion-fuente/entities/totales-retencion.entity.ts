import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'totales_retencion'})
export class TotalesRetencionFuente {

    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly tiporetencionId: string;

    @Column()
    readonly empresaId: string;

    @Column()
    readonly periodo: string;

    @Column()
    readonly base: number;

    @Column()
    valor: string;


}