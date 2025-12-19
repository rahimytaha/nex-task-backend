import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CheckTaskEntity } from './entity/checkTask.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(CheckTaskEntity)
    private checkTaskEntity: Repository<CheckTaskEntity>,
    private scheduleService: ScheduleService,
  ) {}
  async findAllTask(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }
  async findTaskById(id: number, userId?: number) {
    const existTask = await this.taskRepository.findOneBy({
      id,
      schedule: { user: { id: userId } },
    });
    if (!existTask)
      throw new NotFoundException(
        'task could not found or this task is not for this userId',
      );
      existTask.
    return existTask;
  }
  async createTask(
    { name, scheduleId, description }: CreateTaskDto,
    userId: number,
  ): Promise<TaskEntity> {
    await this.scheduleService.findById(scheduleId, userId);
    const newTask = this.taskRepository.create({
      name,
      description,
      schedule: { id: scheduleId },
    });
    return newTask;
  }
    async updateTask(
    dto: UpdateTaskDto,id:number,
    userId: number,
  ): Promise<TaskEntity> {
   const existTask= await this.findTaskById(id, userId);
    Object.assign(existTask,dto)
    existTask.sa
    return existTask;
  }

}
