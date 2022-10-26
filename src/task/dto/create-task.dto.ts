import { IsDate, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsInt()
  userId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  deadline: Date;

  @IsInt()
  priority: number;
}
