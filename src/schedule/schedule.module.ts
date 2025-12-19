import { Module } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleEntity } from "./entity/schedule.entity";
import { ScheduleController } from "./schedule.controller";


@Module({
    imports:[TypeOrmModule.forFeature([ScheduleEntity])],
    providers:[ScheduleService],
    controllers:[ScheduleController],
    exports:[ScheduleService]
})
export class ScheduleModule{}