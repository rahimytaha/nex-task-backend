import { IsOptional, IsString } from "class-validator";


export class CreateScheduleDto{
    @IsString()
    name:string
    @IsOptional()
    @IsString()
    description?:string
}