import { IsString, IsArray, IsNumber, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class MailDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  nom: string;

  @IsEmail()
  adresseMail: string;

  @IsArray()
  cle: string[];

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  prix: number;

  @IsString()
  telephone: string;

  @IsString()
  shippingMethod: string;

  @IsArray()
  typeLivraison: string[];
}
