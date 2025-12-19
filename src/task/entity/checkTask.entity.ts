import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity()
export class CheckTaskEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @CreateDateColumn({name:"insert_date"})
    insertDate:Date
    @ManyToOne(()=>TaskEntity,(task)=>task.checkTasks)
    task:TaskEntity
}