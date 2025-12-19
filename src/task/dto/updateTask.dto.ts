import { PartialType } from "@nestjs/mapped-types";
import { OmitType } from "@nestjs/swagger";
import { CreateTaskDto } from "./createTask.dto";

export class UpdateTaskDto extends PartialType(OmitType(CreateTaskDto,["scheduleId"])){}