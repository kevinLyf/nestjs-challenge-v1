import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Please Enter a Valid Email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please Enter a Valid Password' })
  password: string;
}
