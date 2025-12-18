import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/updateUser.dto';

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
  async create(createDto: CreateUserDto): Promise<number> {
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
    return user.id;
  }
  async update(id:number,updateDto: UpdateUserDto): Promise<boolean> {
    const existUser = await this.usersRepository.findOneBy({
      id
    });
    if (!existUser) throw new ConflictException('this email used before');
    await existUser.save({data:updateDto});
    return true;
  }
  async findById(id: number): Promise<UsersEntity> {
    const exist = await this.usersRepository.findOneBy({ id });
    if (!exist) throw new NotFoundException('user could not found');
    return exist;
  }
  async findByEmail(email: string): Promise<UsersEntity> {
    const existUser = await this.usersRepository.findOneBy({ email: email });
    if (!existUser) throw new NotFoundException('user could not found');
    return existUser;
  }
  async checkUser(email: string, password?: string): Promise<Boolean | number> {
    const existUser = await this.usersRepository.findOne({ where:{email: email},select:{id:true,password:true} });
    if (!existUser) {
      return false;
    } else if (password &&  !  bcrypt.compare(password,existUser.password)) {
      return false;
    }
    return existUser.id;
  }
}
