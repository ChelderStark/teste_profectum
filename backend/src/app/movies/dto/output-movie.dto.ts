export type ReturnMovies = {
  code?: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  like_count?: number;
};

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class OutputMovie {
  @IsNumber()
  @ApiProperty({
    description: 'code of movie',
    default: 12345,
  })
  code: number;

  @IsString()
  @ApiProperty({
    description: 'Title of movie by country',
    default: 12345,
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Original language of movie',
    default: 12345,
  })
  original_language: string;

  @IsString()
  @ApiProperty({
    description: 'Original Title of movie',
    default: 12345,
  })
  original_title: string;

  @IsString()
  @ApiProperty({
    description: 'movie description',
    default: 12345,
  })
  overview: string;

  @IsNumber()
  @ApiProperty({
    description: 'movies popularity points',
    default: 123,
  })
  popularity: number;

  @IsString()
  @ApiProperty({
    description: 'movie poster path',
    default: 12345,
  })
  poster_path: string;

  @IsBoolean()
  @ApiProperty({
    description: 'like the user gave this movie',
    default: true,
  })
  like: boolean;

  @IsNumber()
  @ApiProperty({
    description: 'Numbers of like this movie have',
    default: 123,
  })
  like_count: number;
}
