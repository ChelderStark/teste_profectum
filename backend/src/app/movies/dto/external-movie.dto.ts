import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsBoolean,
  IsDecimal,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class ExternalMovieDto {
  @IsBoolean()
  @ApiProperty({ description: 'If this movie is for adults', default: false })
  adult: boolean;

  @IsEmail()
  @ApiProperty({
    description: 'Path of original background',
    default: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg',
  })
  backdrop_path: string;

  @IsNumber()
  @ApiProperty({ description: 'Code of movie genre', default: [12, 34, 54] })
  genre_ids: number[];

  @IsNumber()
  @ApiProperty({ description: 'Code of movie in TMDB', default: 667538 })
  id: number;

  @IsString()
  @ApiProperty({ description: 'Original language of movie', default: 'en' })
  original_language: string;

  @IsString()
  @ApiProperty({
    description: 'Original title of movie',
    default: 'original title',
  })
  original_title: string;

  @IsString()
  @ApiProperty({
    description: 'Description of movie',
    default: 'Description here',
  })
  overview: string;

  @IsNumber()
  @ApiProperty({
    description: 'Number of popularity this movie',
    default: 1234,
  })
  popularity: number;

  @IsString()
  @ApiProperty({
    description: 'The Movie poster path',
    default: 'zEqwfO5R2LrrLgV61xm8M9TmNTG.jpg',
  })
  poster_path: string;

  @IsString()
  @ApiProperty({ description: 'Movie launch date', default: '2023-06-06' })
  release_date: string;

  @IsString()
  @ApiProperty({ description: 'Local title of Movie', default: 'Title here' })
  title: string;

  @IsBoolean()
  @ApiProperty({ description: 'If this is Video', default: true })
  video: boolean;

  @IsDecimal()
  @ApiProperty({
    description: 'Number of average votes in this movie',
    default: 8.1,
  })
  vote_average: Decimal;

  @IsNumber()
  @ApiProperty({
    description: 'Number of vote in this movie',
    default: 2345,
  })
  vote_count: number;
}
