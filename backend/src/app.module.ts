import { Module } from '@nestjs/common';
import { PrismaModule } from './@core/infra/database/prisma.module';
import { UsersModule } from './app/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/auth/guards/jwt-auth.guard';
import { MoviesModule } from './app/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
