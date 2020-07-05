import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";
import { Status } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: Status;
}