import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user =
      ObjectID.isValid(id) && (await this.userRepository.findOne(id));
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user || !user.email || !user.password) {
      throw new BadRequestException('A user must have an name and password');
    }
    return await this.userRepository.save(new User(user));
  }
  @Put(':id')
  @HttpCode(204)
  async updateUser(
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<void> {
    const exists =
      ObjectID.isValid(id) && (await this.userRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    await this.userRepository.update(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    const exists =
      ObjectID.isValid(id) && (await this.userRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    await this.userRepository.delete(id);
  }
}
