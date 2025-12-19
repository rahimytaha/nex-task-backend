import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { UserPayload } from 'src/commen/decorator/user.decorator';
import type { TUserPayload } from 'src/commen/type/userPayload';
import { UpdateScheduleDto } from './dto/updateSchedule.dto';

@Controller()
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}
  @Get('/all')
  getAll() {
    return this.scheduleService.findAll();
  }
  @Get('byId/:id')
  getById(@Param('id') id: number) {
    return this.scheduleService.findById(id);
  }
  @Get('byUserId/:id')
  getByUserId(@Param('id') id: number) {
    return this.scheduleService.findByUserId(id);
  }
  @Post('create')
  create(@Body() dto: CreateScheduleDto, @UserPayload() { id }: TUserPayload) {
    return this.scheduleService.create(dto, id);
  }
  @Put('update/:id')
  uodate(
    @Body() dto: UpdateScheduleDto,
    @UserPayload() { id: userId }: TUserPayload,
    @Param('id') id: number,
  ) {
    return this.scheduleService.update(dto, id, userId);
  }
  @Delete('delete/:id')
  delete(@UserPayload() { id: userId }: TUserPayload, @Param('id') id: number) {
    return this.scheduleService.delete(id, userId);
  }
  @Get('mine')
  getMine(@UserPayload() { id }: TUserPayload) {
    return this.scheduleService.findByUserId(id);
  }
}
