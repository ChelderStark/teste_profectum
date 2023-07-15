import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';
import { providersRepository } from '@core/domain/repositories';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [MoviesService, ...providersRepository],
  controllers: [MoviesController],
})
export class MoviesModule {}
