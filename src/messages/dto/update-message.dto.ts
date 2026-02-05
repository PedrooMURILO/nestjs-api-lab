import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly text?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  readonly from?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  readonly to?: string;
}
