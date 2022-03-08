import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class GetMovieByReleaseQueryDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1888)
  @Max(new Date().getFullYear())
  @Type(() => Number)
  start_year: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1888)
  @Max(new Date().getFullYear())
  @Type(() => Number)
  end_year: number;
}
