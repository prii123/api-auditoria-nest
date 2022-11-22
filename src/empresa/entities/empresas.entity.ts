import { DocumentoEntity } from "src/documentos/entities/documento.entity";
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

    @OneToMany(() => DocumentoEntity, (documento) => documento.empresa)
    documentos: DocumentoEntity[]

    // createdAt: Date;
}