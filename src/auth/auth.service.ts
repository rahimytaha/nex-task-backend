import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userService.checkUser(email, password);
    if (!existUser) throw new NotFoundException('email or password is wrong');
    const payload = { id: existUser };
    const token = this.jwtService.sign(payload, { secret: '123' });
    return { token };
  }
  async signUp({ email, password, name }: signUpDto) {
    const existUser = await this.userService.checkUser(email);
    if (existUser) throw new NotFoundException('email used before');
    const newUser = await this.userService.create({ email, password, name });
    const payload = { id: newUser };
    const token = this.jwtService.sign(payload, { secret: '123' });
    return { token };
  }
  async decodeToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: '123',
      });
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
