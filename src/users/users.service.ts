import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}
  async findAll(): Promise<UsersEntity[]> {
    const data = await this.usersRepository.find();
    return data;
  }
  async create(createDto: CreateUserDto): Promise<boolean> {
    const existUser = await this.usersRepository.findOneBy({
      email: createDto.email,
    });
    if (existUser) throw new ConflictException('this email used before');
    const user = new UsersEntity();
    user.email = createDto.email;
    user.name = createDto.name;
    user.password = createDto.password;
    user.hashPassword();
    await user.save();
    return true;
  }
  async update(createDto: CreateUserDto): Promise<boolean> {
    const existUser = await this.usersRepository.findOneBy({
      email: createDto.email,
    });
    if (existUser) throw new ConflictException('this email used before');
    const user = new UsersEntity();
    user.email = createDto.email;
    user.name = createDto.name;
    user.password = createDto.password;
    user.hashPassword();
    await user.save();
    return true;
  }
  async findById(id: number) {
    const exist = await this.usersRepository.findOneBy({ id });
    if (!exist) throw new NotFoundException('user could not found');
    return exist;
  }
}
