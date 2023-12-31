import { generateUUID } from '@core/common/utils/uuidGen.util';
import { Prisma, users } from '@prisma/client';

export type User = {
  _id?: string;
  code?: string;
  name?: string;
  email?: string;
  password?: string;
  movies_like?: number[];
  created_at?: Date;
};

export class UserEntity implements users {
  id: string;
  code: string;
  name: string;
  email: string;
  password: string;
  movies_like: number[];
  created_at: Date;

  constructor(props: User) {
    this.code = generateUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.movies_like = props.movies_like ?? [];
    this.created_at = new Date();
  }

  create() {
    const data: Prisma.usersCreateInput = {
      code: this.code,
      name: this.name,
      email: this.email,
      password: this.password,
      movies_like: this.movies_like,
      created_at: this.created_at,
    };

    return data;
  }
}

export const userSelect: Prisma.usersSelect = {
  code: true,
  name: true,
  email: true,
  password: true,
  movies_like: true,
};

export type ReturnUser = {
  code?: string;
  name?: string;
  email?: string;
  movies_like?: number[];
};
