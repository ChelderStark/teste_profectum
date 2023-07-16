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

  /**
   * Create a new User
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>}
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.usersRepository.createUser(createUserDto);
  }

  /**
   * Get all users
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {GetListDto} query
   * @returns {Promise<User[]>}
   */
  async findAll(query: GetListDto): Promise<User[]> {
    const users = await this.usersRepository.getUsers(
      query.getPage,
      query.getItemPerPage,
      query.getSearch,
    );

    return users;
  }

  /**
   * Get one user by email
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {string} email
   * @returns {Promise<User>}
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.getOneUserByEmail(email);
  }

  /**
   * Update like movies of user
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {string} email
   * @param {number} movie
   * @returns {Promise<User>}
   */
  async updateMoviesLike(email: string, movie: number): Promise<User> {
    return await this.usersRepository.updateMovieLike(email, movie);
  }
}
