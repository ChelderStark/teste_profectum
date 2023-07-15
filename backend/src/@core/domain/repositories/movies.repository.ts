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
import { ExternalMovieDto } from 'src/app/movies/dto/external-movie.dto';
import {
  MoviesEntity,
  ReturnMovies,
  movieSelect,
} from '../entities/movies.entity';

@Injectable()
export class MoviesRepository {
  constructor(private prismaClient: PrismaService) {}

  /**
   * Create a resgister of Movie in DB
   * @date 15/07/2023 - 08:20:55 AM
   *
   * @public
   * @async
   * @param {ExternalMovieDto} movie
   * @returns {Promise<ReturnMovies>}
   */
  public async createMovie(movie: ExternalMovieDto): Promise<ReturnMovies> {
    const props = new MoviesEntity({
      code: movie.id,
      title: movie.title,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      like_count: 0,
    }).create();

    const data = await this.prismaClient.movies.create({
      data: props,
      select: movieSelect,
    });

    if (!data) {
      throw new AppError(`Error to try to create Movie`);
    }

    return data;
  }

  // /**
  //  * Get Many users from BD
  //  * @date 15/07/2023 - 08:20:55 AM
  //  *
  //  * @public
  //  * @async
  //  * @constant {pag} number
  //  * @constant {qtd} number
  //  * @constant {search} string
  //  * @returns {Promise<ReturnUser[]>}
  //  */
  // public async getUsers(
  //   pag: number,
  //   qtd: number,
  //   search: string,
  // ): Promise<ReturnUser[]> {
  //   try {
  //     const getPage = (pag - 1 < 0 ? 0 : pag - 1) * qtd;
  //     return await this.prismaClient.users.findMany({
  //       skip: getPage,
  //       take: qtd,
  //       where: { email: { contains: search, mode: 'insensitive' } },
  //       select: userSelect,
  //     });
  //   } catch (err) {
  //     throw new Error(`Error to retrieve a list of Users`);
  //   }
  // }

  /**
   * Get one Movie by ID from DB
   * @date 15/07/2023 - 08:20:55 AM
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<ReturnMovies>}
   */
  public async getOneMovieById(id: number): Promise<ReturnMovies> {
    try {
      const result = await this.prismaClient.movies.findFirst({
        where: { code: id },
        select: movieSelect,
      });
      if (!result) {
        return null;
      }
      return result;
    } catch (err) {
      throw new AppError(`User not found`, HttpStatus.NOT_FOUND);
    }
  }

  // /**
  //  * Get one User from DB by E-mail
  //  * @date 15/07/2023 - 08:20:55 AM
  //  *
  //  * @public
  //  * @async
  //  * @param {string} email
  //  * @returns {Promise<ReturnUser>}
  //  */
  // public async getOneUserByEmail(email: string): Promise<ReturnUser> {
  //   try {
  //     const result = await this.prismaClient.users.findFirst({
  //       where: { email: email },
  //       select: userSelect,
  //     });
  //     if (!result) {
  //       return null;
  //     }
  //     return result;
  //   } catch (err) {
  //     throw new AppError(`User not found`, HttpStatus.NOT_FOUND);
  //   }
  // }
}
