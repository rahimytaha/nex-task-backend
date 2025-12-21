import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UserPayload } from 'src/commen/decorator/user.decorator';
import type { TUserPayload } from 'src/commen/type/userPayload';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('base')
@ApiBearerAuth('JWT-auth')
export class TaskBaseController {
  constructor(private taskService: TaskService) {}
  @Get('all')
  all() {
    return this.taskService.findAllTask();
  }
  @Get('byId/:id')
  getById(
    @UserPayload() { id: userId }: TUserPayload,
    @Param('id') id: number,
  ) {
    return this.taskService.findTaskById(id, userId);
  }
  @Post('/create')
  create(@UserPayload() { id }: TUserPayload, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto, id);
  }
  @Put('/update/:id')
  update(
    @UserPayload() { id }: TUserPayload,
    @Body() dto: UpdateTaskDto,
    @Param('id') taskId: number,
  ) {
    return this.taskService.updateTask(dto, taskId, id);
  }
  @Delete('byId/:id')
  delete(@UserPayload() { id: userId }: TUserPayload, @Param('id') id: number) {
    return this.taskService.deleteTask(id, userId);
  }
  @Get('mine/:scheduleId')
  mine(
    @UserPayload() { id: userId }: TUserPayload,
    @Param('scheduleId') scheduleId: number,
  ) {
    return this.taskService.findTaskBySchedule(scheduleId, userId);
  }
}
