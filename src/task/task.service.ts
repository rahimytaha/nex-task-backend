import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CheckTaskEntity } from './entity/checkTask.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { addDays, startOfWeek } from 'date-fns';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(CheckTaskEntity)
    private checkTaskRepository: Repository<CheckTaskEntity>,
    private scheduleService: ScheduleService,
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
    await newTask.save();
    return newTask;
  }
  async updateTask(
    dto: UpdateTaskDto,
    id: number,
    userId: number,
  ): Promise<TaskEntity> {
    const existTask = await this.findTaskById(id, userId);
    Object.assign(existTask, dto);
    await existTask.save();
    return existTask;
  }
  async deleteTask(id: number, userId: number) {
    const existTask = await this.findTaskById(id, userId);
    await existTask.remove();
    return true;
  }
  async findTaskBySchedule(scheduleId: number, userId: number) {
    return this.taskRepository.find({
      where: { schedule: { id: scheduleId, user: { id: userId } } },
    });
  }
  async check(taskId: number, userId: number) {
    const newTaskCheck = this.checkTaskRepository.create({
      task: { id: taskId, schedule: { user: { id: userId } } },
    });
    await newTaskCheck.save();
    console.log(newTaskCheck);
  }
  getDays(date: Date = new Date()): Date[] {
    const start = startOfWeek(date);
    const weekDays: Date[] = [];
    for (let index = 0; index < 7; index++) {
      weekDays.push(addDays(start, index));
    }
    return weekDays;
  }
  async findCheckTasksList(
    userId: number,
    taskId: number,
    startTime?: Date,
    endTime?: Date,
  ) {
    const where: any = {
      task: {
        id: taskId,
        schedule: {
          user: { id: userId },
        },
      },
    };

    if (startTime && endTime) {
      where.insertDate = Between(startTime, endTime);
    } else if (startTime) {
      where.insertDate = MoreThanOrEqual(startTime);
    } else if (endTime) {
      where.insertDate = LessThanOrEqual(endTime);
    }

    const checkTasksList = await this.checkTaskRepository.find({
      where,
    });
    return checkTasksList;
  }
  async chartData(scheduleId: number, userId: number) {
    const days = this.getDays();
    let tasks = await this.findTaskBySchedule(scheduleId, userId);
    const ee = tasks[1];
    let result: any = [];
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const checkList = await this.findCheckTasksList(
        userId,
        ee.id,
        days[i - 1],
        days[i],
      );
      let pushData = { day, checkList };
      pushData[ee.id] = checkList.length > 0 ? true : false;
      result.push(pushData);
    }
    const checkListAll = await this.findCheckTasksList(userId, ee.id);

    return { result, ee, checkListAll };
  }
}
