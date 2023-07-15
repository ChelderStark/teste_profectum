import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LikeDto {
  @IsNumber()
  @ApiProperty({
    description: 'number of the movie that will receive like',
    default: 12345,
  })
  code_movie: number;
}
