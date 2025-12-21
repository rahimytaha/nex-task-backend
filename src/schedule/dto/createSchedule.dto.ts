import { ApiProperty } from '@nestjs/swagger';
import { IsMilitaryTime, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @ApiProperty({ default: 'name' })
  name: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'description', required: false })
  description?: string;
  @IsOptional()
  @IsMilitaryTime()
  @ApiProperty({ default: '22:00', required: false })
  time?: string;
}
