import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetListDto {
  @ApiProperty({ default: '1', description: 'Number of Actual page' })
  @IsNumberString()
  @IsNotEmpty()
  page: string;

  @ApiProperty({ default: '10', description: 'Number of itens per page' })
  @IsNumberString()
  @IsNotEmpty()
  itemPerPage: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search?: string;

  get getPage(): number {
    const num = Number(this.page);
    if (Number.isNaN(num)) return 1;
    return num;
  }

  get getItemPerPage(): number {
    const num = Number(this.itemPerPage);
    if (Number.isNaN(num)) return 25;
    return num;
  }

  get getSearch(): string {
    return this.search || '';
  }
}
