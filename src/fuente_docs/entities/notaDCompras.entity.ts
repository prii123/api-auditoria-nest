import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CuentasPorPagarEntity } from './CuentasPorPagar.entity'; // Importa la entidad relacionada si es necesario

@Entity('notaDCompras')
export class NotaDComprasEntity {
  @PrimaryGeneratedColumn()
  idNotaCompra: number;

  @Column()
  tipo: number;

  @Column()
  nroNota: number;

  @Column()
  idCuentaPorPagar: number;

  @Column()
  nroConsecutivo: string;

  @Column()
  fechaIni: Date;

  @Column()
  idUser: number;

  @Column()
  idUser2: number;

  @Column()
  idConcepto: number;

  @Column('double')
  bruto: number;

  @Column('double')
  _descuento: number;

  @Column('double')
  descuento: number;

  @Column('double')
  netoGv: number;

  @Column('decimal', { precision: 5, scale: 2 })
  _ipocon: number;

  @Column('double')
  ipoconsumo: number;

  @Column('double')
  baseIva: number;

  @Column('decimal', { precision: 5, scale: 2 })
  _iva: number;

  @Column('double')
  iva: number;

  @Column('double')
  retRenta: number;

  @Column('double')
  retIva: number;

  @Column('double')
  retIca: number;

  @Column('double')
  retCree: number;

  @Column('double')
  retOtros: number;

  @Column('double')
  retTotal: number;

  @Column('double')
  totalCxP: number;

  @Column('double')
  aPagar: number;

  @Column()
  formaPago: number;

  @Column()
  idCentroC: number;

  @Column()
  estado: number;

  @Column()
  id_empresa: number;
}
