import { IsString, IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
