import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: "name can't be empty" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "description can't be empty" })
  description: string;

  project: CreateProjectDto;
}
