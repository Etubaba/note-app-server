import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateNoteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  content: string;
}
