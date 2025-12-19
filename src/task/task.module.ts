import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { CheckTaskEntity } from './entity/checkTask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, CheckTaskEntity])],
  providers: [TaskService],
})
export class TaskModule {}
