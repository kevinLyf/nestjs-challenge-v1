import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsNotEmpty({ message: "project name can't be empty" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "project description can't be empty" })
  description: string;
}
