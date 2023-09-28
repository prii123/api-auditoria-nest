import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('factura')
export class FacturaEntity {
  @Column()
  id: number;
  
  @PrimaryGeneratedColumn()
  id_factura: number;

  @Column({ length: 5, nullable: true })
  prefijo: string;

  @Column()
  nro_factura: number;

  @Column({ length: 20, nullable: true })
  fe_number: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_cre: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_ini: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;

  @Column()
  id_user: number;

  @Column()
  id_user2: number;

  @Column()
  id_cliente: number;

  @Column()
  id_pedido: number;

  @Column({ type: 'double', nullable: true })
  bruto: number;

  @Column({ name: '_descuento', type: 'double', nullable: true })
  _descuento: number;

  @Column({ type: 'double', nullable: true })
  descuento: number;

  @Column({ name: 'neto_gv', type: 'double', nullable: true })
  neto_gv: number;

  @Column({ type: 'double', nullable: true })
  ipoconsumo: number;

  @Column({ type: 'double', nullable: true })
  iva: number;

  @Column({ name: 'total_fac', type: 'double', nullable: true })
  total_fac: number;

  @Column({ length: 10, name: 'id_rrenta', nullable: true })
  id_rrenta: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: '_rrenta', nullable: true })
  _rrenta: number;

  @Column({ type: 'double', name: 'ret_renta', nullable: true })
  ret_renta: number;

  @Column({ length: 10, name: 'id_riva', nullable: true })
  id_riva: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: '_riva', nullable: true })
  _riva: number;

  @Column({ type: 'double', name: 'ret_iva', nullable: true })
  ret_iva: number;

  @Column({ length: 10, name: 'id_rica', nullable: true })
  id_rica: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: '_rica', nullable: true })
  _rica: number;

  @Column({ type: 'double', name: 'ret_ica', nullable: true })
  ret_ica: number;

  @Column({ length: 10, name: 'id_rcree', nullable: true })
  id_rcree: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: '_rcree', nullable: true })
  _rcree: number;

  @Column({ type: 'double', name: 'ret_cree', nullable: true })
  ret_cree: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: '_rotros', nullable: true })
  _rotros: number;

  @Column({ type: 'double', name: 'ret_otros', nullable: true })
  ret_otros: number;

  @Column({ type: 'double', name: 'ret_total', nullable: true })
  ret_total: number;

  @Column()
  id_rcaja1: number;

  @Column({ type: 'double', nullable: true })
  anticipo1: number;

  @Column()
  id_rcaja2: number;

  @Column({ type: 'double', nullable: true })
  anticipo2: number;

  @Column()
  id_rcaja3: number;

  @Column({ type: 'double', nullable: true })
  anticipo3: number;

  @Column({ type: 'double', nullable: true })
  a_pagar: number;

  @Column({ type: 'double', nullable: true })
  saldo: number;

  @Column({ type: 'int', width: 2, nullable: true })
  forma_pago: number;

  @Column()
  id_concepto_conciliacion: number;

  @Column()
  id_centroc: number;

  @Column()
  id_contrato: number;

  @Column({ type: 'double', nullable: true })
  costo: number;

  @Column({ length: 1000, nullable: true })
  observacion: string;

  @Column({ type: 'tinyint' })
  estado: number;

  @Column({ length: 20, nullable: true })
  nota: string;

  @Column()
  id_empresa: number;
}
