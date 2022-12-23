import { EmpresasEntity } from "src/empresa/entities/empresas.entity";
import { TipoRetencionFuente } from './tipo-retencion.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'totales_retencion' })
export class TotalesRetencionFuente {

    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly tiporetencionId: number;

    @Column()
    readonly empresaId: number;

    @Column()
    readonly periodo: string;

    @Column()
    readonly base: number;

    @Column()
    valor: string;

    @ManyToOne(() => EmpresasEntity, (empresa) => empresa.empresa)
    empresa: EmpresasEntity;

    @OneToOne(() => TipoRetencionFuente)
    @JoinColumn()
    tiporetencion: TipoRetencionFuente;


}