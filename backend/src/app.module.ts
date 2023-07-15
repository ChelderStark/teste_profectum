import { Module } from '@nestjs/common';
import { PrismaModule } from './@core/infra/database/prisma.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
