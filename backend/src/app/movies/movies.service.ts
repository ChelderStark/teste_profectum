import { MoviesRepository } from '@core/domain/repositories/movies.repository';
import { AppError } from '@core/infra/error/app.error';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ExternalMovieDto } from './dto/external-movie.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MoviesService {
  constructor(
    private readonly http: HttpService,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async getMoviesFromTMDB() {
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
    for (const movie of externalMovies) {
      const is_exists = await this.moviesRepository.getOneMovieById(movie.id);
      if (!is_exists) {
        const movies = await this.moviesRepository.createMovie(movie);
        resultMovies.push(movies);
      }
    }

    return resultMovies;
  }
}
