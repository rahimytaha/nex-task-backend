import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './entity/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { UpdateScheduleDto } from './dto/updateSchedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
  ) {}
  async findAll() {
    const data = await this.scheduleRepository.find();
    return data;
  }
  async create(dto: CreateScheduleDto, userId: number) {
    const newSchedule = new ScheduleEntity();
    newSchedule.save({ data: { ...dto, userId } });
    return newSchedule.id;
  }
  async update(dto: UpdateScheduleDto, userId: number) {
    const existSchedule = await this.scheduleRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!existSchedule)
      throw new NotFoundException(
        'schedule could not found or this schedule is not for this userId',
      );
    existSchedule.save({ data: dto });
    return existSchedule.id;
  }
  async delete(id: number) {
    const existSchedule = await this.scheduleRepository.findOne({
      where: { id },
    });
    if (!existSchedule)
      throw new NotFoundException(
        'schedule could not found or this schedule is not for this userId',
      );
    existSchedule.remove();
    return true;
  }
  async findByUserId(userId: number) {
    const existSchedule = await this.scheduleRepository.find({
      where: { user: { id: userId } },
    });
    return existSchedule
  }
  async findById(id: number) {}
}
