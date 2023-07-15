import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma.service';
import {
  ReturnUser,
  User,
  UserEntity,
  userSelect,
} from '../entities/users.entity';
import { users } from '@prisma/client';
import { AppError } from '@core/infra/error/app.error';

@Injectable()
export class UsersRepository {
  constructor(private prismaClient: PrismaService) {}

  /**
   * Create a resgister of User in DB
   * @date 15/07/2023 - 08:20:55 AM
   *
   * @public
   * @async
   * @param {User} user
   * @returns {Promise<ReturnUser>}
   */
  public async createUser(user: User): Promise<ReturnUser> {
    const props = new UserEntity(user).create();

    const emailExists = await this.getOneUserByEmail(user.email);

    if (emailExists) {
      throw new AppError(`Email already exists`, HttpStatus.CONFLICT);
    }

    const data = await this.prismaClient.users.create({
      data: props,
      select: userSelect,
    });

    if (!data) {
      throw new AppError(`Error to try create User`);
    }

    return data;
  }

  /**
   * Get Many users from BD
   * @date 15/07/2023 - 08:20:55 AM
   *
   * @public
   * @async
   * @constant {pag} number
   * @constant {qtd} number
   * @constant {search} string
   * @returns {Promise<ReturnUser[]>}
   */
  public async getUsers(
    pag: number,
    qtd: number,
    search: string,
  ): Promise<ReturnUser[]> {
    try {
      const getPage = (pag - 1 < 0 ? 0 : pag - 1) * qtd;
      return await this.prismaClient.users.findMany({
        skip: getPage,
        take: qtd,
        where: { email: { contains: search, mode: 'insensitive' } },
        select: userSelect,
      });
    } catch (err) {
      throw new Error(`Error to retrieve a list of Users`);
    }
  }

  /**
   * Get one User from DB
   * @date 15/07/2023 - 08:20:55 AM
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<ReturnUser>}
   */
  public async getOneUserById(id: string): Promise<ReturnUser> {
    try {
      const result = await this.prismaClient.users.findFirst({
        where: { code: id },
        select: userSelect,
      });
      if (!result) {
        return null;
      }
      return result;
    } catch (err) {
      throw new AppError(`User not found`, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Get one User from DB by E-mail
   * @date 15/07/2023 - 08:20:55 AM
   *
   * @public
   * @async
   * @param {string} email
   * @returns {Promise<ReturnUser>}
   */
  public async getOneUserByEmail(email: string): Promise<ReturnUser> {
    try {
      const result = await this.prismaClient.users.findFirst({
        where: { email: email },
        select: userSelect,
      });
      if (!result) {
        return null;
      }
      return result;
    } catch (err) {
      throw new AppError(`User not found`, HttpStatus.NOT_FOUND);
    }
  }
}
