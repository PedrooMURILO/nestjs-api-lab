import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Max(50)
  @Min(0)
  limit: number;

  @Type(() => Number)
  @Min(0)
  offset: number;
}
