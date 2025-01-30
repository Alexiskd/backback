// src/stancer/stancer.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Post as PostDecorator } from '@nestjs/common';
import { StancerService } from './stancer.service';
import { CreatePaymentPageDto } from './create-payment-page.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stancer')
@Controller('stancer')
export class StancerController {
  private readonly logger = new Logger(StancerController.name);

  constructor(private readonly stancerService: StancerService) {
    this.logger.log('Contrôleur Stancer initialisé');
  }

  @Post('create')
@ApiOperation({ summary: 'Créer une page de paiement' })
@ApiResponse({ status: 201, description: 'Page de paiement créée avec succès.' })
@ApiResponse({ status: 400, description: 'Données invalides.' })
@ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
async createPaymentPage(@Body() createPaymentPageDto: CreatePaymentPageDto) {
  this.logger.debug(`Requête reçue pour créer une page de paiement avec les données: ${JSON.stringify(createPaymentPageDto)}`);
  try {
    const result = await this.stancerService.createPaymentPage(createPaymentPageDto);
    this.logger.debug(`Page de paiement créée avec succès: ${JSON.stringify(result)}`);
    this.logger.log(`Réponse envoyée avec l'URL de paiement: ${result.url}`);
    return { paymentUrl: result.url };
  } catch (error) {
    this.logger.error(`Erreur dans le contrôleur lors de la création de la page de paiement: ${error.message}`, error.stack);
    throw new HttpException(
      error.message || 'Erreur lors de la création de la page de paiement',
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

    
  
}
