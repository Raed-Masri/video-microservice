import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class VideoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  ageRestriction: string;

  @IsNotEmpty()
  @IsNumber()
  averageRating: number;

  @IsNotEmpty()
  @IsString()
  videoUrl: string;
}
