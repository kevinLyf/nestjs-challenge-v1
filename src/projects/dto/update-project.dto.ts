import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProjectDto } from '../../projects/dto/create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  @IsNotEmpty({ message: "project name can't be empty" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "project description can't be empty" })
  description: string;
}
