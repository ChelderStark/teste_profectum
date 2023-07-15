import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'name of user', default: 'teste 1' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'e-mail of user', default: 'teste@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'password of user', default: 'teste123' })
  password: string;
}
