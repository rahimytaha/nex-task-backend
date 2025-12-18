import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { ScheduleEntity } from "src/schedule/entity/schedule.entity";

@Entity()
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number 
    @Column()
    name:string
    @Column({unique:true})
    email:string
    @Column({select:false})
    password:string
    @OneToMany(()=>ScheduleEntity,(schedule)=>schedule.user)
    schedules:ScheduleEntity[]
    @BeforeInsert()
    async hashPassword(){
        this.password=await bcrypt.hash(this.password,10)
    }
}