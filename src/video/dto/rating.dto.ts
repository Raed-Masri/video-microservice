import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class RatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
  userId: string;
}
