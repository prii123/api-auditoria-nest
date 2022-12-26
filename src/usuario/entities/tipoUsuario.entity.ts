import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipo_roles' })
export class TipoUsersEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre_rol: string;

}

