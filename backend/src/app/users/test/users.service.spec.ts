import { UsersRepository } from '@core/domain/repositories';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { generateUUID } from '@core/common/utils/uuidGen.util';

describe('UsersService', () => {
  let userService: UsersService;
  let usersRepository: UsersRepository;

  const methodMock = jest.fn();

  const repositoryMock = jest.fn(() => ({
    createUser: methodMock,
    // updateMotive: methodMock,
    // removeMotive: methodMock,
    // getMotives: methodMock,
    // getOneMotive: methodMock,
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
});
