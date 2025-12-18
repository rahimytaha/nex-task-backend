import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignInDto } from "./dto/signIn.dto";



@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}
    async signIn(SignInDto:SignInDto){
        const {id,password} = await this.userService.findByEmail(SignInDto.email)
        if(password ===SignInDto.password)throw new BadRequestException("password is wrong")
        const payload = {id}
        return existUser
    }
    async signUp(){

    }
}