import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';
import { providersRepository } from '@core/domain/repositories';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), UsersModule],
  providers: [MoviesService, ...providersRepository],
  controllers: [MoviesController],
})
export class MoviesModule {}
