import { EmpresasEntity } from "src/empresa/entities/empresas.entity";
import { DetalleRetencionFuente } from "src/impuestos/retencion-fuente/entities/retencion-fuente.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'documento' })
export class DocumentoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nit: string;

    @Column()
    razonSocial: string;

    @Column()
    tipoDoc: string;

    @Column()
    numeroDoc: string;

    @Column()
    numeroFE: string;

    @Column()
    valorNeto: number;

    @Column()
    impuesto: number;

    @Column()
    reteFuente: number;

    @Column()
    reteIva: number;

    @Column()
    periodo: string;

    @Column()
    empresaId: number;

    @Column()
    hallazgo: number;

    // @ManyToOne(()=> EmpresasEntity, (empresa) => empresa.documentos)
    // empresa: EmpresasEntity;

    // @OneToOne(() => DetalleRetencionFuente, (doc) => doc.documento)
    // documento: DetalleRetencionFuente;

}
