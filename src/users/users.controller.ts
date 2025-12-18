import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPayload } from 'src/commen/decorator/user.decorator';
import type { TUserPayload } from 'src/commen/type/userPayload';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('all')
  async finndAll() {
    return this.userService.findAll();
  }
  @Get('byId/:id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
  @Get('profile')
  async myProfile(@UserPayload() { id }: TUserPayload) {
    return this.userService.findById(id);
  }
  @Post('create')
  async create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }
  @Put('update/:id')
  async updateById(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
  @Put('profile')
  async updateMyProfile(
    @UserPayload() { id }: TUserPayload,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }
}
