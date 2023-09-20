import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('ordenPagoCont')
export class OrdenPagoContEntity {
  @PrimaryGeneratedColumn()
  idOrdenPagoCont: number;

  @Column()
  idCuentaPorPagar: number;

  @Column('decimal', { precision: 32, scale: 0 })
  abonoOP: number;

  @Column('decimal', { precision: 32, scale: 0 })
  pagadoOP: number;

  @Column()
  id_empresa: number;
}
