import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string

    @ManyToMany(() => Project)
    @JoinTable()
    projects: Project[];
}
