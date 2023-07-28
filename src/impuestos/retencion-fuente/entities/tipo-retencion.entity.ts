import { TotalesRetencionFuente } from './totales-retencion.entity'
import { DetalleRetencionFuente } from './retencion-fuente.entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tipo_retencion'})
export class TipoRetencionFuente {

    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly concepto: string;

    // @OneToOne(() => TotalesRetencionFuente, (empresa) => empresa.tiporetencion)
    // tipoRet: TotalesRetencionFuente;

    // @OneToOne(() => DetalleRetencionFuente, (retencion) => retencion.tiporetencion)
    // tipoRete: DetalleRetencionFuente;


}
