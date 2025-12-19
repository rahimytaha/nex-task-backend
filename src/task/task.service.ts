import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}
  async findAllTask(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }
  async findTaskById(id: number, userId?: number): Promise<TaskEntity> {
    const existTask = await this.taskRepository.findOneBy({
      id,
      schedule: { user: { id: userId } },
    });
    if (!existTask)
      throw new NotFoundException(
        'task could not found or this task is not for this userId',
      );
    return existTask;
  }
}
