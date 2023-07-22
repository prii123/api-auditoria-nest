import { DocumentoEntity } from "src/documentos/documento/entities/documento.entity";
import { TotalesRetencionFuente } from "src/impuestos/retencion-fuente/entities/totales-retencion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'empresas' })
export class EmpresasEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nit: string;

    @Column()
    razonSocial: string;

    @Column()
    digitoVerificacion: string;

    @Column()
    direccion: string;

    @Column()
    ciudad: string;

    @Column()
    logo: string;

    @Column()
    autorrenta: number;

    @Column()
    creadorId: number;

    @OneToMany(() => DocumentoEntity, (documento) => documento.empresa)
    documentos: DocumentoEntity[]

    @OneToMany(() => TotalesRetencionFuente, (empresa) => empresa.empresa)
    empresa: TotalesRetencionFuente[]

    // @ManyToOne(() => EmpresasEntity, (empresa) => empresa.empresa)
    // empresa: EmpresasEntity;

    // createdAt: Date;
}