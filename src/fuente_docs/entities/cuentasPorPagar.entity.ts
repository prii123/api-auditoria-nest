import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProveedorEntity } from './proveedor.entity'; // Asegúrate de tener una entidad para 'proveedores' definida

@Entity('cuentasPorPagar')
export class CuentasPorPagarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idCuentaPorPagar' })
  idCuentaPorPagar: number;

  @Column({ name: 'nroCuenta' })
  nroCuenta: number;

  @Column({ name: 'nroFactura' })
  nroFactura: string;

  @Column({ name: 'fechaCre' })
  fechaCre: Date;

  @Column({ name: 'fechaIni' })
  fechaIni: Date;

  @Column({ name: 'fechaFin' })
  fechaFin: Date;

  @Column({ name: 'idProveedor' })
  idProveedor: number;

  @Column({ name: 'idUser' })
  idUser: number;

  @Column()
  bruto: number;

  @Column({ name: '_descuento' })
  _descuento: number;

  @Column()
  descuento: number;

  @Column({ name: 'netoGv' })
  netoGv: number;

  @Column({ name: 'ipoconsumo' })
  ipoconsumo: number;

  @Column()
  iva: number;

  @Column({ name: 'totalCxP' })
  totalCxP: number;

  @Column({ name: '_rrenta' })
  _rrenta: number;

  @Column({ name: 'retRenta' })
  retRenta: number;

  @Column({ name: '_riva' })
  _riva: number;

  @Column({ name: 'retIva' })
  retIva: number;

  @Column({ name: '_rica' })
  _rica: number;

  @Column({ name: 'retIca' })
  retIca: number;

  @Column({ name: '_rcree' })
  _rcree: number;

  @Column({ name: 'retCree' })
  retCree: number;

  @Column({ name: '_rotros' })
  _rotros: number;

  @Column({ name: 'retOtros' })
  retOtros: number;

  @Column({ name: 'retTotal' })
  retTotal: number;

  @Column({ name: 'aPagar' })
  aPagar: number;

  @Column({ name: 'idConcepto' })
  idConcepto: number;

  @Column({ name: 'idCentroC' })
  idCentroC: number;

  @Column({ name: 'idContrato' })
  idContrato: number;

  @Column()
  estado: number;

  @Column({ name: 'id_empresa' })
  id_empresa: number;

  @ManyToOne(() => ProveedorEntity)
  @JoinColumn({ name: 'idProveedor', referencedColumnName: 'id_proveedor' })
  proveedor: ProveedorEntity;
}

