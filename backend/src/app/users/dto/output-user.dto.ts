import { User } from '@core/domain/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OutputUserDto implements User {
  @ApiProperty({ description: 'User Identifier' })
  code?: string;

  @ApiProperty({ description: 'User name' })
  name?: string;

  @ApiProperty({ description: 'User e-mail' })
  email?: string;

  @ApiProperty({ description: 'User e-mail' })
  movies_like?: number[];
}
