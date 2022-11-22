import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'hallazgoz_y_correcciones'})
export class Hallazgo {

    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    documentoId: string;

    // @Column()
    tipodocumentoId: string;

    @Column()
    hallazgo: string;

    // @Column()
    accioncorrectiva: string;

    @Column()
    empresaId: number;

    @Column()
    periodo: string;

    @Column()
    created_at: string;

}
