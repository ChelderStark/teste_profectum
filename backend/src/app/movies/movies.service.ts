import { MoviesRepository } from '@core/domain/repositories/movies.repository';
import { AppError } from '@core/infra/error/app.error';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ExternalMovieDto } from './dto/external-movie.dto';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { AuthRequest } from '../auth/models/AuthRequest';
import { LikeDto } from './dto/like.dto';
import { User } from '@core/domain/entities/users.entity';
import { ReturnMovies } from '@core/domain/entities/movies.entity';
import { GetListDto } from '@core/common/dto/get-list.dto';
import { OutputMovie } from './dto/output-movie.dto';

@Injectable()
export class MoviesService {
  private readonly logger: Logger;
  constructor(
    private readonly http: HttpService,
    private readonly moviesRepository: MoviesRepository,
    private readonly usersService: UsersService,
  ) {
    this.logger = new Logger(MoviesService.name);
  }

  /**
   * Scheduler for charges a list of Movies from TMDB external APÌ
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @returns {Promise<ExternalMovieDto[]>}
   */
  @Cron('*/30 * * * * *', { name: 'get_reps', timeZone: 'America/Sao_Paulo' })
  async getMoviesFromTMDB(): Promise<ExternalMovieDto[]> {
    const { data } = await firstValueFrom(
      this.http
        .get(process.env.PATH_TMDB, {
          params: {
            language: 'pt-BR',
            page: '1',
            sort_by: 'popularity.desc',
          },
          headers: {
            Authorization: `Bearer ${process.env.TOKEN_TMDB}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new AppError(`Error to try list of movies in external API!`);
          }),
        ),
    );

    const externalMovies: ExternalMovieDto[] = data.results;

    const resultMovies = [];

    this.logger.log('Initialize Updates of External API TMDB.');
    for (const movie of externalMovies) {
      const is_exists = await this.moviesRepository.getOneMovieById(movie.id);
      if (!is_exists) {
        this.logger.log('New Data was saved in DB.');
        const movies = await this.moviesRepository.createMovie(movie);
        resultMovies.push(movies);
      }
    }

    return resultMovies;
  }

  /**
   * inserts like of movie in user and count +1 like in movie
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {LikeDto} like
   * @param {AuthRequest} req
   * @returns {Promise<User>}
   */
  async likeThisMovie(like: LikeDto, req: AuthRequest): Promise<User> {
    const user = await this.usersService.updateMoviesLike(
      req.user.email,
      like.code_movie,
    );
    if (!user) {
      throw new AppError(`Error to try inserts like to User`);
    }
    await this.moviesRepository.updateCountLike(like.code_movie);
    return user;
  }

  /**
   * Returns a list of movies by like
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {GetListDto} query
   * @param {AuthRequest} req
   * @returns {Promise<OutputMovie>}
   */
  async getMoviesByLike(
    query: GetListDto,
    req: AuthRequest,
  ): Promise<OutputMovie[]> {
    const movies = await this.moviesRepository.listMoviesByLike(
      query.getPage,
      query.getItemPerPage,
    );

    const user = await this.usersService.findOneByEmail(req.user.email);
    const user_likes = user.movies_like;

    const resultData = [];
    for (const movie of movies) {
      const is_like = user_likes.filter((like) => like == movie.code);

      if (is_like.length > 0) {
        resultData.push(await this.buildMovie(movie, true));
      } else {
        resultData.push(await this.buildMovie(movie, false));
      }
    }

    return resultData;
  }

  /**
   * Returns a list of movies
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {GetListDto} query
   * @param {AuthRequest} req
   * @returns {Promise<ReturnMovies[]>}
   */
  async getAllMovies(
    query: GetListDto,
    req: AuthRequest,
  ): Promise<OutputMovie[]> {
    const movies = await this.moviesRepository.listAllMovies(
      query.getPage,
      query.getItemPerPage,
    );

    const user = await this.usersService.findOneByEmail(req.user.email);
    const user_likes = user.movies_like;

    const resultData = [];
    for (const movie of movies) {
      const is_like = user_likes.filter((like) => like == movie.code);

      if (is_like.length > 0) {
        resultData.push(await this.buildMovie(movie, true));
      } else {
        resultData.push(await this.buildMovie(movie, false));
      }
    }

    return resultData;
  }

  /**
   * Builds output movies based likes by user
   * @date 15/07/2023 - 19:15:08 PM
   *
   * @async
   * @param {ReturnMovies} movie
   * @param {boolean} like
   * @returns {Promise<OutputMovie>}
   */
  async buildMovie(movie: ReturnMovies, like?: boolean): Promise<OutputMovie> {
    return {
      code: movie.code,
      title: movie.title,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      like: like,
      like_count: movie.like_count,
    };
  }
}
