import { MoviesRepository } from '@core/domain/repositories/movies.repository';
import { AppError } from '@core/infra/error/app.error';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ExternalMovieDto } from './dto/external-movie.dto';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { AuthRequest } from '../auth/models/AuthRequest';
import { LikeDto } from './dto/like.dto';

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
   * Charges a list of Movies from TMDB external APÌ
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

  async likeThisMovie(like: LikeDto, req: AuthRequest) {
    return await this.usersService.updateMoviesLike(
      req.user.email,
      like.code_movie,
    );
  }
}
