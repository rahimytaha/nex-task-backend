import { Injectable } from '@nestjs/common';
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
  async create(dto:CreateScheduleDto){}
  async update(dto:UpdateScheduleDto){}
  async delete(id:UpdateScheduleDto){}
  
}
