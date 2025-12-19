import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    name:string
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description?:string
    @IsNumber()
    @IsNotEmpty()
    scheduleId:number
}