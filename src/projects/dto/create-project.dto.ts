import { IsNotEmpty, IsString,  } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty({ message: "project name can't be empty" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "project descriptio can't be empty" })
    description: string;
}
