import { TaskEntity } from "src/task/entity/task.entity";
import { UsersEntity } from "src/users/entity/users.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ScheduleEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    description?:string
    @ManyToOne(()=>UsersEntity,(user)=>user.schedules)
    user:UsersEntity
    @OneToMany(()=>TaskEntity,(task)=>task.schedule)
    Tasks:TaskEntity[]
}