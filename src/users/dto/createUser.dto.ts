import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ default: 'example@gmail.com' })
  email: string;
  @IsString()
  @MinLength(8)
  @ApiProperty({ default: '12345678' })
  password: string;
  @IsString()
  @ApiProperty({ default: 'name' })
  name: string;
}
