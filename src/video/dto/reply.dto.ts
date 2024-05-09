import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyDto {
  @IsNotEmpty()
  @IsString()
  reply: string;
}
