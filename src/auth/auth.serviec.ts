import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";



@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}
    async signIn(email:string,password:string){
        const existUser = await this.userService.findById(i)
    }
    async signUp(){

    }
}