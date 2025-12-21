import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";


export class SignInDto {
    @ApiProperty({default:"example@gmail.com",description:"email for login"})
    @IsEmail()
    email:string
    @ApiProperty({default:"12345678",description:"password for login"})
    @MinLength(8)
    password:string
}