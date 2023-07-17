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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExternalMovieDto } from './dto/external-movie.dto';
import { AuthRequest } from '../auth/models/AuthRequest';
import { LikeDto } from './dto/like.dto';
import { GetListDto } from '@core/common/dto/get-list.dto';
import { OutputMovie } from './dto/output-movie.dto';
import { OutputUserDto } from '../users/dto/output-user.dto';

@Controller('api/v1/movies')
@ApiTags('Movie')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Inserts movie_like to user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like Inserted',
    type: OutputUserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Like Insert error',
  })
  async movieLike(
    @Body() likeDto: LikeDto,
    @Request() req: AuthRequest,
  ): Promise<OutputUserDto> {
    return await this.moviesService.likeThisMovie(likeDto, req);
  }

  @Get('likes')
  @ApiOperation({ summary: 'List most like movies' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'list of movie retrieve',
    type: OutputMovie,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Movies get list error.',
  })
  async listMoviesByLike(
    @Query() query: GetListDto,
    @Request() req: AuthRequest,
  ): Promise<OutputMovie[]> {
    return await this.moviesService.getMoviesByLike(query, req);
  }

  @Get()
  @ApiOperation({ summary: 'List of all movies by polarity' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'list of movie retrieve',
    type: OutputMovie,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Movies get list error.',
  })
  async getAllMovies(
    @Query() query: GetListDto,
    @Request() req: AuthRequest,
  ): Promise<OutputMovie[]> {
    return await this.moviesService.getAllMovies(query, req);
  }
}
