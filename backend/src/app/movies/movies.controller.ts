import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExternalMovieDto } from './dto/external-movie.dto';
import { AuthRequest } from '../auth/models/AuthRequest';
import { LikeDto } from './dto/like.dto';
import { GetListDto } from '@core/common/dto/get-list.dto';
import { OutputMovie } from './dto/output-movie.dto';

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
    return await this.moviesService.getMoviesFromTMDB();
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

  @Get('likes')
  @ApiOperation({ summary: 'List most like movies' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'list of movie retrieve',
    type: ExternalMovieDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Movies get list error.',
  })
  async listMoviesByLike(
    @Query() query: GetListDto,
    @Request() req: AuthRequest,
  ) {
    return await this.moviesService.getMoviesByLike(query, req);
  }

  @Get()
  @ApiOperation({ summary: 'List of all movies' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'list of movie retrieve',
    type: OutputMovie,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Movies get list error.',
  })
  async getAllMovies(@Query() query: GetListDto, @Request() req: AuthRequest) {
    return await this.moviesService.getAllMovies(query, req);
  }
}
