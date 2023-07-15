import { Module } from '@nestjs/common';
import { PrismaModule } from './@core/infra/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
