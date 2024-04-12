import { IsNotEmpty, IsString } from "class-validator";
import { CreateProjectDto } from "src/projects/dto/create-project.dto";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateTaskDto {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @IsString()
    @IsNotEmpty({ message: "name can't be empty" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "name can't be empty" })
    description: string;

    project: CreateProjectDto;
}
