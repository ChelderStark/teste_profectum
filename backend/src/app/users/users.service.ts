import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from '@core/domain/repositories';
import { ReturnUser, User } from '@core/domain/entities/users.entity';
import { GetListDto } from '@core/common/dto/get-list.dto';
import { users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.usersRepository.createUser(createUserDto);
  }

  async findAll(query: GetListDto): Promise<User[]> {
    const users = await this.usersRepository.getUsers(
      query.getPage,
      query.getItemPerPage,
      query.getSearch,
    );

    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.getOneUserByEmail(email);
  }
}
