import { IsString, IsNumber, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentPageDto {
  @ApiProperty({ example: 1000, description: 'Montant en centimes' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'eur', description: 'Devise en minuscule' })
  @IsString()
  currency: string;

  @ApiProperty({ example: 'Achat de produit XYZ' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://http://localhost:5173/payment-result' })
  @IsUrl({ require_tld: true }) // Requiert une URL valide
  return_url: string;
}
