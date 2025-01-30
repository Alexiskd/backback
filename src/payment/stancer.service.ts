import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CreatePaymentPageDto } from './create-payment-page.dto';

@Injectable()
export class StancerService {
  private readonly apiKey: string = 'ptest_mSvVJVUqFV7K8DFh9tQJ9j4H'; // Clé API Stancer
  private readonly apiUrl: string = 'https://api.stancer.com/v1/checkout'; // URL de base API
  private readonly publicKey: string = 'ptest_mSvVJVUqFV7K8DFh9tQJ9j4H'; // Utilisez la clé publique pour générer l'URL
  private readonly logger = new Logger(StancerService.name);

  constructor() {
    this.logger.log(`Service Stancer initialisé avec API URL: ${this.apiUrl}`);
    this.logger.log(`Service Stancer initialisé avec API Key: ${this.apiKey}`);
  }

  async createPaymentPage(paymentData: CreatePaymentPageDto): Promise<{ url: string }> {
    this.logger.debug(`Création d'une page de paiement avec les données: ${JSON.stringify(paymentData)}`);
    const url = this.apiUrl;

    try {
      const response = await axios.post(
        url,
        {
          amount: paymentData.amount,
          currency: paymentData.currency.toLowerCase(), // Convertir la devise en minuscule
          description: paymentData.description,
          return_url: paymentData.return_url,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
          },
        },
      );

      this.logger.debug(`Réponse de l'API: ${JSON.stringify(response.data)}`);

      // Générer l'URL de paiement
      const paymentUrl = `https://payment.stancer.com/${this.publicKey}/${response.data.id}`;
      this.logger.log(`Page de paiement créée avec succès: ${paymentUrl}`);

      // Retourner l'URL construite
      return { url: paymentUrl };
    } catch (error: any) {
      const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorMessage = error.response?.data?.message || error.message;

      this.logger.error(
        `Erreur lors de la création de la page de paiement (status ${statusCode}): ${errorMessage}`,
        error.stack,
      );

      throw new HttpException(
        `Erreur lors de la création de la page de paiement : ${errorMessage}`,
        statusCode,
      );
    }
  }
}
