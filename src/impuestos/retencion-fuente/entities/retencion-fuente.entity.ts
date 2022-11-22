import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'detalle_retencion'})
export class DetalleRetencionFuente {

    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly tiporetencionId: number;

    @Column()
    readonly empresaId: number;

    @Column()
    readonly documentoId: number;

    @Column()
    readonly periodo: string;

    @Column()
    readonly base: number;

    @Column()
    valor: number;


}
