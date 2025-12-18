import { Body, Controller, Post } from "@nestjs/common";
import { SignInDto } from "./dto/signIn.dto";
import { AuthService } from "./auth.service";
import { signUpDto } from "./dto/signUp.dto";
import { Public } from "./public.decorator";


@Controller()
export class AuthController{
    constructor(private authService:AuthService){}
    @Public()
    @Post("/signIn")
    async signIn (@Body() dto:SignInDto) {
        return this.authService.signIn(dto)
    }
    @Public()
    @Post("/signUp")
    async signUp (@Body() dto:signUpDto) {
        return this.authService.signUp(dto)
    }
}