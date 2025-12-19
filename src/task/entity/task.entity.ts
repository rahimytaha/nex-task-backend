import { ScheduleEntity } from 'src/schedule/entity/schedule.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CheckTaskEntity } from './checkTask.entity';

@Entity()
export class TaskEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description?: string;
  @Column()
  iconAddress?: string;
  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.tasks)
  schedule: ScheduleEntity;
  @OneToMany(()=>CheckTaskEntity,(checkTask)=>checkTask.task)
  checkTasks:CheckTaskEntity[]
}
