import { MoviesRepository } from './movies.repository';
import { UsersRepository } from './users.repository';

export const providersRepository = [UsersRepository, MoviesRepository];

export { UsersRepository, MoviesRepository };
