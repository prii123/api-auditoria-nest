import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class UsersEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;


    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    image_url: string;

    @Column()
    idRol: number;

    // createdAt: Date;
}

