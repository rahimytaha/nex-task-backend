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
   const newSchedule = this.scheduleRepository.create({
      ...dto,
      user:{id:userId}
    });

    const savedSchedule = await this.scheduleRepository.save(newSchedule);

    return savedSchedule.id;
  }
  async update(dto: UpdateScheduleDto,id:number, userId: number) {
    const existSchedule = await this.findById(id,userId)
    Object.assign(existSchedule,dto)
   await existSchedule.save();
    return existSchedule.id;
  }
    async findById(id: number, userId?: number) {
    const existSchedule = await this.scheduleRepository.findOneBy({
       user:{id:userId} ,id
    });
    if (!existSchedule)
      throw new NotFoundException(
        'schedule could not found or this schedule is not for this userId',
      );
    return existSchedule
  }
  async delete(id: number,userId?:number) {
    const existSchedule = await this.findById(id,userId)
    existSchedule.remove();
    return true;
  }
  async findByUserId(userId: number) {
    const existSchedule = await this.scheduleRepository.find({
      where: { user: { id: userId } },
    });
    return existSchedule;
  }

}
