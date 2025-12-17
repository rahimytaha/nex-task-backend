import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number 
    @Column()
    name:string
    @Column({unique:true})
    email:string
    @Column()
    password:string
    @BeforeInsert()
    async hashPassword(){
        this.password=await bcrypt.hash(this.password,10)
    }
}