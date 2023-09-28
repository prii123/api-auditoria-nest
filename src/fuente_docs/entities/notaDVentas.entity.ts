import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notaDVentas')
export class NotaDVentasEntity {
  @Column()
  id: number;
  
  @PrimaryGeneratedColumn()
  id_nota: number;

  @Column({ type: 'tinyint' })
  tipo: number;

  @Column({ length: 5, nullable: true })
  prefijo: string;

  @Column({ length: 10 })
  nro_nota: string;

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
  id_factura: number;

  @Column()
  id_concepto: number;

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

  @Column({ name: 'total_nota', type: 'double', nullable: true })
  total_nota: number;

  @Column({ name: '_rrenta', type: 'decimal', precision: 5, scale: 2, nullable: true })
  _rrenta: number;

  @Column({ name: 'ret_renta', type: 'double', nullable: true })
  ret_renta: number;

  @Column({ name: '_riva', type: 'decimal', precision: 5, scale: 2, nullable: true })
  _riva: number;

  @Column({ name: 'ret_iva', type: 'double', nullable: true })
  ret_iva: number;

  @Column({ name: '_rica', type: 'decimal', precision: 5, scale: 2, nullable: true })
  _rica: number;

  @Column({ name: 'ret_ica', type: 'double', nullable: true })
  ret_ica: number;

  @Column({ name: '_rotros', type: 'decimal', precision: 5, scale: 2, nullable: true })
  _rotros: number;

  @Column({ name: 'ret_otros', type: 'double', nullable: true })
  ret_otros: number;

  @Column({ type: 'double', nullable: true })
  a_pagar: number;

  @Column()
  id_centroc: number;

  @Column()
  id_contrato: number;

  @Column({ type: 'tinyint' })
  estado: number;

  @Column({ length: 20, nullable: true })
  fe_number: string;

  @Column()
  id_empresa: number;
}
