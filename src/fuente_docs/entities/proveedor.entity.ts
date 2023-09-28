import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CuentasPorPagarEntity } from './cuentasPorPagar.entity'; // Asegúrate de tener una entidad para 'cuentasPorPagar' definida

@Entity('proveedores')
export class ProveedorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_proveedor' })
  id_proveedor: number;

  @Column({ name: 'tipo_doc' })
  tipo_doc: number;

  @Column()
  documento: string;

  @Column()
  digito: number;

  @Column({ name: 'nombre1' })
  nombre1: string;

  @Column({ name: 'nombre2' })
  nombre2: string;

  @Column({ name: 'apellido1' })
  apellido1: string;

  @Column({ name: 'apellido2' })
  apellido2: string;

  @Column({ name: 'razon_social' })
  razon_social: string;

  @Column({ name: 'nomComercial' })
  nomComercial: string;

  @Column()
  direccion: string;

  @Column({ name: 'departamento' })
  departamento: number;

  @Column({ name: 'ciudad' })
  ciudad: number;

  @Column()
  telefono: string;

  @Column()
  mail: string;

  @Column()
  tipo: number;

  @Column({ name: 'id_empresa' })
  id_empresa: number;

  @OneToMany(() => CuentasPorPagarEntity, cuentasPorPagar => cuentasPorPagar.proveedor)
  cuentasPorPagar: CuentasPorPagarEntity[];
}
