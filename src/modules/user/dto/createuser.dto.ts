import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  password: string;
}
