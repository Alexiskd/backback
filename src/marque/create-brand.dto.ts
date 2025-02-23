import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty({ message: 'Le champ nom est obligatoire' })
  nom: string;

  @IsString()
  logo?: string;
}
