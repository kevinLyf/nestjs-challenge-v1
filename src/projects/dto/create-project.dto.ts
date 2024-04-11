import { IsNotEmpty, IsString, } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty({ message: "project name can't be empty" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "project descriptio can't be empty" })
    description: string;

    users?: CreateUserDto[];
}
