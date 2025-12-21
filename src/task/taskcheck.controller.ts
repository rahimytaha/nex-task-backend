import { Controller, Get, Param, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { UserPayload } from 'src/commen/decorator/user.decorator';
import type { TUserPayload } from 'src/commen/type/userPayload';

@Controller('check')
export class TaskCheckController {
  constructor(private taskCheckService: TaskService) {}
  @Patch('/:taskId')
  check(@Param('taskId') taskId: number, @UserPayload() { id }: TUserPayload) {
    return this.taskCheckService.check(taskId,id)
  }
  @Get('/:scheduleId')
  chartData(
    @Param('scheduleId') scheduleId: number,
    @UserPayload() { id }: TUserPayload,
  ) {
    return this.taskCheckService.chartData(scheduleId, id);
  }
}
