import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  content: string;
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  user_id: number;
}
