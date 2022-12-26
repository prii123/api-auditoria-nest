import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class UsersEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        nullable: false,
        select: false,
    })
    password: string;

    @Column({ default: null })
    image_url: string;

    @Column({ default: 2 })
    idRol: number;

    // createdAt: Date;
}

