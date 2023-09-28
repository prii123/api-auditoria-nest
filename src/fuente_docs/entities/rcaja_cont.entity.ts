import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('rcaja_cont')
export class RCajaContEntity {
  @Column()
  id: number;
  
  @PrimaryGeneratedColumn()
  id_rcaja_cont: number;

  @Column()
  id_factura: number;

  @Column('double')
  abonoRC: number;

  @Column()
  id_empresa: number;
}
