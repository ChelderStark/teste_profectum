import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @IsPublic()
  @Get()
  async chargeExternalMovies() {
    return this.moviesService.getMoviesFromTMDB();
  }
}
