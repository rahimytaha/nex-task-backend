import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { CheckTaskEntity } from './entity/checkTask.entity';
import { TaskBaseController } from './taskbase.controller';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, CheckTaskEntity]),ScheduleModule],
  providers: [TaskService],
  controllers:[TaskBaseController]
})
export class TaskModule {}
