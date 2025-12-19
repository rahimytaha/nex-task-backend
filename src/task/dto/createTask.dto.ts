import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto{
    @IsString()
    name:string
    @IsString()
    @IsOptional()
    description?:string
    @IsNumber()
    scheduleId:number
}