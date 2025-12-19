import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity()
export class CheckTaskEntity{
    @PrimaryGeneratedColumn()
    id:number
    @CreateDateColumn({name:"insert_date"})
    insertDate:Date
    @ManyToOne(()=>TaskEntity,(task)=>task.checkTasks)
    task:TaskEntity
}