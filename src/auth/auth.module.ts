import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports:[UsersModule,JwtModule.register({global:true,secret:process.env.jwtSecret,signOptions:{expiresIn:"6m"}})],
    providers:[AuthService]
})
export class AuthModule {}