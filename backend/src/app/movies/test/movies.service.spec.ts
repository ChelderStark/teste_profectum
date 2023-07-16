import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { HttpService } from '@nestjs/axios';
import { MoviesRepository } from '@core/domain/repositories';
import { UsersService } from 'src/app/users/users.service';
import { AppError } from '@core/infra/error/app.error';
import { catchError, of } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { ExternalMovieDto } from '../dto/external-movie.dto';
import { request } from 'express';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let httpService: HttpService;
  let moviesRepository: MoviesRepository;
  let userService: UsersService;

  const methodMovieMock = jest.fn();
  const methodUserMock = jest.fn();

  const repositoryMovieMock = jest.fn(() => ({
    createMovie: methodMovieMock,
    getOneMovieById: methodMovieMock,
    updateCountLike: methodMovieMock,
    listMoviesByLike: methodMovieMock,
  }));

  const repositoryUserMock = jest.fn(() => ({
    getOneUserByEmail: methodUserMock,
    updateMovieLike: methodUserMock,
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: HttpService, useValue: { get: jest.fn() } },
        {
          provide: MoviesRepository,
          useClass: repositoryMovieMock,
        },
        {
          provide: UsersService,
          useClass: repositoryUserMock,
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    httpService = module.get<HttpService>(HttpService);
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });

  it('should gets a list of movies from external API', async () => {
    const data: any = jest.spyOn(httpService, 'get').mockReturnValue(of());

    const externalMovies: ExternalMovieDto[] = data.results;
    console.log(externalMovies);
  });
});
