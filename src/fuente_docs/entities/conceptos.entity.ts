import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('conceptos')
export class ConceptosEntity {
  @PrimaryGeneratedColumn()
  id_concepto: number;

  @Column()
  cod_concepto: string;

  @Column()
  nom_concepto: string;

  @Column()
  abreviado: string;

  @Column()
  id_fuente: number;

  @Column()
  formulario: number;

  @Column()
  id_empresa: number;
}
