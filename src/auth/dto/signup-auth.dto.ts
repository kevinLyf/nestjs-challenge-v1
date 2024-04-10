import { IsEmail, IsString } from "class-validator";

export class SignUpAuthDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}