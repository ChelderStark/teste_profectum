import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MoviesService } from 'src/app/movies/movies.service';

@Injectable()
export class OnStartApp implements OnModuleInit {
  private readonly logger: Logger;
  constructor(private readonly moviesService: MoviesService) {
    this.logger = new Logger(OnStartApp.name);
  }

  async onModuleInit() {
    this.logger.log(`Initialize Charge of TMDB API.`);
    await this.moviesService.getMoviesFromTMDB();
  }
}
