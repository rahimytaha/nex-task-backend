
import { ScheduleEntity } from "src/schedule/entity/schedule.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TaskEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    description:string
    @Column()
    iconAddress:string
    @ManyToOne(()=>ScheduleEntity,(schedule)=>)
    schedule:ScheduleEntity
}