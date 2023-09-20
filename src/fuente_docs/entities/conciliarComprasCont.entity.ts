import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('conciliarComprasCont')
export class ConciliarComprasContEntity {
  @PrimaryGeneratedColumn()
  idConciliarComprasCont: number;

  @Column()
  idCuentaPorPagar: number;

  @Column('double')
  abonoCC: number;

  @Column('double')
  pagadoCC: number;

  @Column()
  id_empresa: number;
}
