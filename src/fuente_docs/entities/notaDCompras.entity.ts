import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CuentasPorPagarEntity } from './cuentasPorPagar.entity'; // Asegúrate de tener una entidad para 'cuentasPorPagar' definida
import { ProveedorEntity } from './proveedor.entity'; // Asegúrate de tener una entidad para 'proveedores' definida

@Entity('notaDCompras')
export class NotaDComprasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idNotaCompra' })
  idNotaCompra: number;

  @Column({ name: 'tipo' })
  tipo: number;

  @Column({ name: 'nroNota' })
  nroNota: number;

  @Column({ name: 'idCuentaPorPagar' })
  idCuentaPorPagar: number;

  @Column({ name: 'nroConsecutivo' })
  nroConsecutivo: string;

  @Column({ name: 'fechaIni' })
  fechaIni: Date;

  @Column({ name: 'fechaCre' })
  fechaCre: Date;

  @Column({ name: 'fechaGenerado' })
  fechaGenerado: Date;

  @Column({ name: 'idUser' })
  idUser: number;

  @Column({ name: 'idUser2' })
  idUser2: number;

  @Column({ name: 'idProveedor' })
  idProveedor: number;

  @Column({ name: 'idConcepto' })
  idConcepto: number;

  @Column()
  bruto: number;

  @Column({ name: '_descuento' })
  _descuento: number;

  @Column()
  descuento: number;

  @Column({ name: 'netoGv' })
  netoGv: number;

  @Column({ name: '_ipocon', type: 'decimal', precision: 5, scale: 2 })
  _ipocon: number;

  @Column({ name: 'ipoconsumo' })
  ipoconsumo: number;

  @Column({ name: 'baseIva' })
  baseIva: number;

  @Column({ name: '_iva', type: 'decimal', precision: 5, scale: 2 })
  _iva: number;

  @Column({ name: 'iva' })
  iva: number;

  @Column({ name: 'retRenta' })
  retRenta: number;

  @Column({ name: 'retIva' })
  retIva: number;

  @Column({ name: 'retIca' })
  retIca: number;

  @Column({ name: 'retCree' })
  retCree: number;

  @Column({ name: 'retOtros' })
  retOtros: number;

  @Column({ name: 'retTotal' })
  retTotal: number;

  @Column({ name: 'totalCxP' })
  totalCxP: number;

  @Column({ name: 'aPagar' })
  aPagar: number;

  @Column({ name: 'formaPago' })
  formaPago: number;

  @Column({ name: 'idCentroC' })
  idCentroC: number;

  @Column({ name: 'idContrato' })
  idContrato: number;

  @Column()
  estado: number;

  @Column({ name: 'id_empresa' })
  id_empresa: number;

  @ManyToOne(() => CuentasPorPagarEntity)
  @JoinColumn({ name: 'idCuentaPorPagar', referencedColumnName: 'idCuentaPorPagar' })
  cuentaPorPagar: CuentasPorPagarEntity;

  @ManyToOne(() => ProveedorEntity)
  @JoinColumn({ name: 'idProveedor', referencedColumnName: 'id_proveedor' })
  proveedor: ProveedorEntity;
}
