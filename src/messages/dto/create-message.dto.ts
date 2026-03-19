import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly text: string;

  @IsPositive()
  fromId: number;

  @IsPositive()
  toId: number;
}
