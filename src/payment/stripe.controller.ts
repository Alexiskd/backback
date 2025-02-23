import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentPageDto } from './create-payment-page.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  private readonly logger = new Logger(StripeController.name);

  constructor(private readonly stripeService: StripeService) {
    this.logger.log('Stripe Controller initialisé');
  }

  @Post('create')
  @ApiOperation({ summary: 'Créer une session de paiement Stripe' })
  @ApiResponse({ status: 201, description: 'Session de paiement créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
  async createPaymentPage(@Body() createPaymentPageDto: CreatePaymentPageDto) {
    this.logger.debug(`Requête reçue pour créer une session de paiement avec les données: ${JSON.stringify(createPaymentPageDto)}`);
    try {
      const result = await this.stripeService.createPaymentPage(createPaymentPageDto);
      this.logger.debug(`Session de paiement créée avec succès: ${JSON.stringify(result)}`);
      this.logger.log(`URL de paiement: ${result.url}`);
      return { paymentUrl: result.url };
    } catch (error: any) {
      this.logger.error(`Erreur lors de la création de la session de paiement: ${error.message}`, error.stack);
      throw new HttpException(
        error.message || 'Erreur lors de la création de la session de paiement',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
