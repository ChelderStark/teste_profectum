import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'name of user', default: 'teste 1' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'e-mail of user', default: 'teste@gmail.com' })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ description: 'password of user', default: '%Teste@1234' })
  password: string;
}
