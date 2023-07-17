import { UsersRepository } from '@core/domain/repositories';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { generateUUID } from '@core/common/utils/uuidGen.util';
import { GetListDto } from '@core/common/dto/get-list.dto';

describe('UsersService', () => {
  let userService: UsersService;
  let usersRepository: UsersRepository;

  const methodMock = jest.fn();

  const repositoryMock = jest.fn(() => ({
    createUser: methodMock,
    getUsers: methodMock,
    getOneUserByEmail: methodMock,
    updateMovieLike: methodMock,
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useClass: repositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it('should be create a new User', async () => {
    const uuid = generateUUID();
    const createData = {
      name: 'teste 1',
      email: 'teste@gmail.com',
      password: 'T@fd123',
    };

    methodMock.mockReset().mockResolvedValueOnce({
      code: uuid,
      name: createData.name,
      email: createData.email,
      password: createData.password,
      created_at: new Date(),
    });

    const user = await userService.create(createData);

    expect(user).toBeTruthy();
    expect(user.code).toEqual(uuid);
    expect(user.name).toEqual(createData.name);
    expect(user.email).toEqual(createData.email);
    expect(user).toHaveProperty('created_at');
  });

  it('should be retrieve a list of Users', async () => {
    const query = {
      page: '1',
      itemPerPage: '2',
      search: 'algo',
    } as GetListDto;

    methodMock.mockReset().mockResolvedValueOnce([
      {
        code: generateUUID(),
        name: 'teste 1',
        email: 'teste1@email.com',
        password: '123456',
        movies_like: [],
        created_at: new Date(),
      },
      {
        code: generateUUID(),
        name: 'teste 2',
        email: 'teste2@email.com',
        password: '123456',
        movies_like: [],
        created_at: new Date(),
      },
    ]);

    const user = await userService.findAll(query);
    expect(user.length).toBeGreaterThanOrEqual(2);
  });

  it('should be retrieve one User by Email', async () => {
    const email = 'teste1@email.com';

    methodMock.mockReset().mockResolvedValueOnce({
      code: generateUUID(),
      name: 'teste 1',
      email: 'teste1@email.com',
      password: '123456',
      movies_like: [],
      created_at: new Date(),
    });

    const user = await userService.findOneByEmail(email);
    expect(user.email).toEqual(email);
    expect(user).toHaveProperty('code');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('created_at');
  });

  it('should be insert ID of movie that received like', async () => {
    const email = 'teste1@email.com';
    const movieCode = 12345;

    methodMock.mockReset().mockResolvedValueOnce({
      code: generateUUID(),
      name: 'teste 1',
      email: 'teste1@email.com',
      password: '123456',
      movies_like: [movieCode],
      created_at: new Date(),
    });

    const user = await userService.updateMoviesLike(email, movieCode);
    console.log(user.movies_like);

    expect(user.email).toEqual(email);
    expect(typeof user.movies_like).toEqual('object');
    expect(new Set(user.movies_like)).toContain(movieCode);
  });
});
