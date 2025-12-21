import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'name' })
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'description', required: false })
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 'scheduleId' ,type:Number,example:123})
  scheduleId: number;
}
