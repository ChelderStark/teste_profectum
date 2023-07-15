import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';

describe('MoviesService', () => {
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });
});
