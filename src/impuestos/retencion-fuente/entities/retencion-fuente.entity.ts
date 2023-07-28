import { DocumentoEntity } from "src/documentos/documento/entities/documento.entity";
import { EmpresasEntity } from "src/empresa/entities/empresas.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoRetencionFuente } from "./tipo-retencion.entity";

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


    // @ManyToOne(() => EmpresasEntity, (empresa) => empresa.empresa)
    // empresa: EmpresasEntity;

    // @OneToOne(() => TipoRetencionFuente)
    // @JoinColumn()
    // tiporetencion: TipoRetencionFuente;

    // @OneToOne(() => DocumentoEntity)
    // @JoinColumn()
    // documento: DocumentoEntity;


}
