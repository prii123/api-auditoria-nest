import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('pagoDirectoCont')
export class PagoDirectoContEntity {
  @PrimaryGeneratedColumn()
  idPagoDirectoCont: number;

  @Column()
  idPagoDirecto: number;

  @Column()
  nroPagoDirecto: number;

  @Column()
  fechaPago: Date;

  @Column()
  idUser: number;

  @Column()
  estado: number;

  @Column()
  idConcepto: number;

  @Column()
  idFactura: number;

  @Column()
  idCentroC: number;

  @Column()
  documento: string;

  @Column()
  abono: number;

  @Column()
  descuento: number;

  @Column('double')
  iva: number;

  @Column('double')
  ipoconsumo: number;

  @Column()
  pagado: number;

  @Column()
  id_empresa: number;
}
