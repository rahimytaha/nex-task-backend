import { Module } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleEntity } from "./entity/schedule.entity";


@Module({
    imports:[TypeOrmModule.forFeature([ScheduleEntity])],
    providers:[ScheduleService]
})
export class ScheduleModule{}