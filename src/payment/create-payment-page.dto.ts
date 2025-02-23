import { IsString, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentPageDto {
  @ApiProperty({ example: 100, description: 'Montant en centimes (100 = 1€)' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'eur', description: 'Devise en minuscule' })
  @IsString()
  currency: string;

  @ApiProperty({ example: 'Paiement de 1€', description: 'Description de la transaction' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://votresite.com/success', description: 'URL de redirection en cas de succès' })
  @IsUrl({ require_tld: false })
  success_url: string;

  @ApiProperty({ example: 'https://votresite.com/cancel', description: 'URL de redirection en cas d\'annulation' })
  @IsUrl({ require_tld: false })
  cancel_url: string;
}
