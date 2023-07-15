import { generateUUID } from '@core/common/utils/uuidGen.util';
import { Prisma, movies } from '@prisma/client';

export type Movies = {
  id?: string;
  code?: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  like_count?: number;
};

export class MoviesEntity implements movies {
  id: string;
  code: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  like_count: number;
  created_at: Date;

  constructor(props: Movies) {
    this.code = props.code;
    this.title = props.title;
    this.original_language = props.original_language;
    this.original_title = props.original_title;
    this.overview = props.overview;
    this.poster_path = props.poster_path;
    this.like_count = props.like_count;
    this.created_at = new Date();
  }

  create() {
    const data: Prisma.moviesCreateInput = {
      code: this.code,
      title: this.title,
      original_language: this.original_language,
      original_title: this.original_title,
      overview: this.overview,
      poster_path: this.poster_path,
      like_count: this.like_count,
      created_at: this.created_at,
    };

    return data;
  }
}

export const movieSelect: Prisma.moviesSelect = {
  code: true,
  title: true,
  original_language: true,
  original_title: true,
  overview: true,
  poster_path: true,
  like_count: true,
};

export type ReturnMovies = {
  code?: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  like_count?: number;
};
