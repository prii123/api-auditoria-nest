import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProveedorEntity } from './proveedor.entity'; // Asegúrate de tener una entidad para 'proveedores' definida

@Entity('pagoDirectoCont')
export class PagoDirectoContEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idPagoDirectoCont' })
  idPagoDirectoCont: number;

  @Column({ name: 'idPagoDirecto' })
  idPagoDirecto: number;

  @Column({ name: 'nroPagoDirecto' })
  nroPagoDirecto: number;

  @Column({ name: 'fechaCre' })
  fechaCre: Date;

  @Column({ name: 'fechaIni' })
  fechaIni: Date;

  @Column({ name: 'fechaPago' })
  fechaPago: Date;

  @Column({ name: 'idUser' })
  idUser: number;

  @Column()
  estado: number;

  @Column({ name: 'idProveedor' })
  idProveedor: number;

  @Column({ name: 'idConcepto' })
  idConcepto: number;

  @Column({ name: 'idFactura' })
  idFactura: number;

  @Column({ name: 'idCentroC' })
  idCentroC: number;

  @Column({ name: 'idContrato' })
  idContrato: number;

  @Column()
  documento: string;

  @Column()
  abono: number;

  @Column()
  descuento: number;

  @Column()
  iva: number;

  @Column({ name: 'ipoconsumo' })
  ipoconsumo: number;

  @Column()
  pagado: number;

  @Column({ name: 'id_empresa' })
  id_empresa: number;

  @ManyToOne(() => ProveedorEntity)
  @JoinColumn({ name: 'idProveedor', referencedColumnName: 'id_proveedor' })
  proveedor: ProveedorEntity;
}
