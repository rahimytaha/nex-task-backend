import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignInDto } from "./dto/signIn.dto";



@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}
    async signIn(SignInDto:SignInDto){
        const existUser = await this.userService.findByEmail(SignInDto.email)
        return existUser
    }
    async signUp(){

    }
}