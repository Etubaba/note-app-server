import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  password: string;
}
