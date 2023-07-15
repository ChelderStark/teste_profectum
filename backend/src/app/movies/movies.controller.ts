import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExternalMovieDto } from './dto/external-movie.dto';
import { AuthRequest } from '../auth/models/AuthRequest';
import { LikeDto } from './dto/like.dto';

@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('update-movie')
  @ApiOperation({ summary: 'Charge a list of movie from external API TMDB' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create User',
    type: ExternalMovieDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User Create error',
  })
  async chargeExternalMovies(): Promise<ExternalMovieDto[]> {
    return this.moviesService.getMoviesFromTMDB();
  }

  @Post()
  @ApiOperation({ summary: 'Inserts movie_like to user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like Inserted',
    type: ExternalMovieDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Like Insert error',
  })
  async movieLike(@Body() likeDto: LikeDto, @Request() req: AuthRequest) {
    return await this.moviesService.likeThisMovie(likeDto, req);
  }
}
