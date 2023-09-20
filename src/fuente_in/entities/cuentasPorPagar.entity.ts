import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cuentasPorPagar')
export class CuentasPorPagarEntity {
  @PrimaryGeneratedColumn()
  idCuentaPorPagar: number;

  @Column()
  nroCuenta: number;

  @Column()
  nroFactura: string;

  @Column()
  fechaIni: Date;

  @Column()
  idUser: number;

  @Column('double')
  bruto: number;

  @Column('double')
  _descuento: number;

  @Column('double')
  descuento: number;

  @Column('double')
  netoGv: number;

  @Column('double')
  ipoconsumo: number;

  @Column('double')
  iva: number;

  @Column('double')
  totalCxP: number;

  @Column('decimal', { precision: 5, scale: 2 })
  _rrenta: number;

  @Column('double')
  retRenta: number;

  @Column('decimal', { precision: 5, scale: 2 })
  _riva: number;

  @Column('double')
  retIva: number;

  @Column('decimal', { precision: 5, scale: 2 })
  _rica: number;

  @Column('double')
  retIca: number;

  @Column('decimal', { precision: 5, scale: 2 })
  _rcree: number;

  @Column('double')
  retCree: number;

  @Column('decimal', { precision: 5, scale: 2 })
  _rotros: number;

  @Column('double')
  retOtros: number;

  @Column('double')
  retTotal: number;

  @Column('double')
  aPagar: number;

  @Column()
  idConcepto: number;

  @Column()
  idCentroC: number;

  @Column()
  estado: number;

  @Column()
  id_empresa: number;
}
