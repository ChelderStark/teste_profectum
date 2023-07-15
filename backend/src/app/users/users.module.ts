import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { providersRepository } from '@core/domain/repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...providersRepository],
})
export class UsersModule {}
