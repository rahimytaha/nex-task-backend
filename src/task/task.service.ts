import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CheckTaskEntity } from './entity/checkTask.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(CheckTaskEntity)
    private checkTaskEntity: Repository<CheckTaskEntity>,
  ) {
    
  }
}
