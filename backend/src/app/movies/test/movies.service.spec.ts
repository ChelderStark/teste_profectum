import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { HttpService } from '@nestjs/axios';
import { MoviesRepository } from '@core/domain/repositories';
import { UsersService } from 'src/app/users/users.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ExternalMovieDto } from '../dto/external-movie.dto';
import { INestApplication } from '@nestjs/common';
import { GetListDto } from '@core/common/dto/get-list.dto';
import { generateUUID } from '@core/common/utils/uuidGen.util';
import { AuthRequest } from 'src/app/auth/models/AuthRequest';
import { ReturnUser } from '@core/domain/entities/users.entity';

describe('MoviesService', () => {
  let app: INestApplication;
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
    listAllMovies: methodMovieMock,
  }));

  const repositoryUserMock = jest.fn(() => ({
    getOneUserByEmail: methodUserMock,
    updateMovieLike: methodUserMock,
    findOneByEmail: methodUserMock,
    updateMoviesLike: methodUserMock,
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [HttpService],
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

  // it('should gets a list of movies from external API', async () => {
  //   const result: AxiosResponse = {
  //     data: {},
  //     status: 200,
  //     statusText: 'OK',
  //     headers: { Authorization: `Bearer ${process.env.TOKEN_TMDB}` },
  //     config: {
  //       baseURL: process.env.PATH_TMDB,
  //       headers: undefined,
  //       params: {
  //         language: 'pt-BR',
  //         page: '1',
  //         sort_by: 'popularity.desc',
  //       },
  //     },
  //   };

  //   jest.spyOn(httpService, 'get').mockReturnValue(of(result));

  //   const movies = await moviesService.getMoviesFromTMDB();
  // });

  it('should be retrieve a list of movies by popularity', async () => {
    const query = {
      page: '1',
      itemPerPage: '2',
      search: 'algo',
    } as GetListDto;

    const req = {
      user: {
        code: 'acfe6afa-edfb-4044-acfd-ccc68f08ddb8',
        name: 'teste1',
        email: 'teste1@email.com',
        movies_like: [447365, 667538],
      } as ReturnUser,
    } as AuthRequest;

    methodMovieMock.mockReset().mockResolvedValueOnce([
      {
        code: {
          $numberLong: '667538',
        },
        title: 'Transformers: O Despertar das Feras',
        original_language: 'en',
        original_title: 'Transformers: Rise of the Beasts',
        overview:
          'Transformers: O Despertar das Feras traz mais uma aventura épica pelo universo dos transformers. Ambientada nos anos 1990, o filme apresentará os Maximals, Predacons e Terrorcons à batalha existente na Terra entre Autobots e Decepticons.',
        popularity: {
          $numberLong: '7572',
        },
        poster_path:
          'https://image.tmdb.org/t/p/w500/zEqwfO5R2LrrLgV61xm8M9TmNTG.jpg',
        like_count: {
          $numberLong: '6',
        },
        created_at: {
          $date: '2023-07-16T15:18:30.459Z',
        },
      },
      {
        code: {
          $numberLong: '447365',
        },
        title: 'Guardiões da Galáxia: Vol. 3',
        original_language: 'en',
        original_title: 'Guardians of the Galaxy Vol. 3',
        overview:
          'Peter Quill, que ainda está a recuperar da perda de Gamora, tem que reunir a sua equipa para defender o universo e proteger um dos seus. Uma missão que, se não for concluída com sucesso, pode levar ao fim dos Guardiões como os conhecemos.',
        popularity: {
          $numberLong: '5048',
        },
        poster_path:
          'https://image.tmdb.org/t/p/w500/4yycSPnchdNAZirGkmCYQwTd3cr.jpg',
        like_count: {
          $numberLong: '1',
        },
        created_at: {
          $date: '2023-07-16T15:18:30.477Z',
        },
      },
    ]);
    const email = 'teste1@email.com';
    methodUserMock.mockReset().mockReturnValueOnce({
      code: 'acfe6afa-edfb-4044-acfd-ccc68f08ddb8',
      name: 'teste1',
      email: email,
      password: '$2b$10$cfdcOJx25XcnW3lYS5EeH.n0PwJQfXsOzbL7ST/3mrpVWU1vUn7by',
      movies_like: [447365, 667538],
      created_at: {
        $date: '2023-07-15T15:07:40.071Z',
      },
    });

    const popMovies = await moviesService.getAllMovies(query, req);

    expect(popMovies.length).toBeGreaterThanOrEqual(1);
    expect(typeof popMovies).toBe('object');
  });

  it('should be retrieve a list of movies by Likes', async () => {
    const query = {
      page: '1',
      itemPerPage: '2',
      search: 'algo',
    } as GetListDto;

    const req = {
      user: {
        code: 'acfe6afa-edfb-4044-acfd-ccc68f08ddb8',
        name: 'teste1',
        email: 'teste1@email.com',
        movies_like: [447365, 667538],
      } as ReturnUser,
    } as AuthRequest;

    methodMovieMock.mockReset().mockResolvedValueOnce([
      {
        code: {
          $numberLong: '667538',
        },
        title: 'Transformers: O Despertar das Feras',
        original_language: 'en',
        original_title: 'Transformers: Rise of the Beasts',
        overview:
          'Transformers: O Despertar das Feras traz mais uma aventura épica pelo universo dos transformers. Ambientada nos anos 1990, o filme apresentará os Maximals, Predacons e Terrorcons à batalha existente na Terra entre Autobots e Decepticons.',
        popularity: {
          $numberLong: '7572',
        },
        poster_path:
          'https://image.tmdb.org/t/p/w500/zEqwfO5R2LrrLgV61xm8M9TmNTG.jpg',
        like_count: {
          $numberLong: '6',
        },
        created_at: {
          $date: '2023-07-16T15:18:30.459Z',
        },
      },
      {
        code: {
          $numberLong: '447365',
        },
        title: 'Guardiões da Galáxia: Vol. 3',
        original_language: 'en',
        original_title: 'Guardians of the Galaxy Vol. 3',
        overview:
          'Peter Quill, que ainda está a recuperar da perda de Gamora, tem que reunir a sua equipa para defender o universo e proteger um dos seus. Uma missão que, se não for concluída com sucesso, pode levar ao fim dos Guardiões como os conhecemos.',
        popularity: {
          $numberLong: '5048',
        },
        poster_path:
          'https://image.tmdb.org/t/p/w500/4yycSPnchdNAZirGkmCYQwTd3cr.jpg',
        like_count: {
          $numberLong: '1',
        },
        created_at: {
          $date: '2023-07-16T15:18:30.477Z',
        },
      },
    ]);
    const email = 'teste1@email.com';
    methodUserMock.mockReset().mockReturnValueOnce({
      code: 'acfe6afa-edfb-4044-acfd-ccc68f08ddb8',
      name: 'teste1',
      email: email,
      password: '$2b$10$cfdcOJx25XcnW3lYS5EeH.n0PwJQfXsOzbL7ST/3mrpVWU1vUn7by',
      movies_like: [447365, 667538],
      created_at: {
        $date: '2023-07-15T15:07:40.071Z',
      },
    });

    const likeMovies = await moviesService.getMoviesByLike(query, req);

    expect(likeMovies.length).toBeGreaterThanOrEqual(1);
    expect(typeof likeMovies).toBe('object');
  });

  it('should be retrieve a list of movies by Likes', async () => {
    const like = {
      code_movie: 667538,
    };
    const req = {
      user: {
        code: 'acfe6afa-edfb-4044-acfd-ccc68f08ddb8',
        name: 'teste1',
        email: 'teste1@email.com',
        movies_like: [447365],
      } as ReturnUser,
    } as AuthRequest;

    methodMovieMock.mockReset().mockResolvedValueOnce([
      {
        code: {
          $numberLong: '667538',
        },
        title: 'Transformers: O Despertar das Feras',
        original_language: 'en',
        original_title: 'Transformers: Rise of the Beasts',
        overview:
          'Transformers: O Despertar das Feras traz mais uma aventura épica pelo universo dos transformers. Ambientada nos anos 1990, o filme apresentará os Maximals, Predacons e Terrorcons à batalha existente na Terra entre Autobots e Decepticons.',
        popularity: {
          $numberLong: '7572',
        },
        poster_path:
          'https://image.tmdb.org/t/p/w500/zEqwfO5R2LrrLgV61xm8M9TmNTG.jpg',
        like_count: {
          $numberLong: '6',
        },
        created_at: {
          $date: '2023-07-16T15:18:30.459Z',
        },
      },
    ]);
    const email = 'teste1@email.com';
    methodUserMock.mockReset().mockReturnValueOnce({
      code: 'acfe6afa-edfb-4044-acfd-ccc68f08ddb8',
      name: 'teste1',
      email: email,
      password: '$2b$10$cfdcOJx25XcnW3lYS5EeH.n0PwJQfXsOzbL7ST/3mrpVWU1vUn7by',
      movies_like: [447365, 667538],
      created_at: {
        $date: '2023-07-15T15:07:40.071Z',
      },
    });

    const movieLike = await moviesService.likeThisMovie(like, req);

    expect(typeof movieLike).toBe('object');
    expect(movieLike.movies_like.length).toBeGreaterThanOrEqual(1);
    expect(movieLike.movies_like).toContain(like.code_movie);
  });
});
