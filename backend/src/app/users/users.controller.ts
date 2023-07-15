import { Controller, Get, Post, Body, Query, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetListDto } from '@core/common/dto/get-list.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@core/domain/entities/users.entity';
import { OutputPayload } from '@core/common/interface/output-payload.interface';
import { OutputUserDto } from './dto/output-user.dto';

@Controller('api/v1/users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create User',
    type: OutputUserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User Create error',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<OutputUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users in Data Base paginated.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users list retrieve.',
    type: OutputUserDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Users get list error.',
  })
  async findAll(@Query() query: GetListDto): Promise<OutputPayload<User>> {
    const users = await this.usersService.findAll(query);

    const payload = {
      data: users,
      pagination: {
        current: +query.getPage,
        count: +users.length,
      },
      total_register: 1,
    };

    return payload;
  }
}
