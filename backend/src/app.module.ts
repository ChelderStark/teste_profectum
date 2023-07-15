import { Module } from '@nestjs/common';
import { PrismaModule } from './@core/infra/database/prisma.module';
import { UsersModule } from './app/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
