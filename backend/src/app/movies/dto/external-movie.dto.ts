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
  adult: boolean;

  @IsEmail()
  backdrop_path: string;

  @IsNumber()
  genre_ids: number[];

  @IsNumber()
  id: number;

  @IsString()
  original_language: string;

  @IsString()
  original_title: string;

  @IsString()
  overview: string;

  @IsNumber()
  popularity: number;

  @IsString()
  poster_path: string;

  @IsString()
  release_date: string;

  @IsString()
  title: string;

  @IsBoolean()
  video: boolean;

  @IsDecimal()
  vote_average: Decimal;

  @IsNumber()
  vote_count: number;
}
