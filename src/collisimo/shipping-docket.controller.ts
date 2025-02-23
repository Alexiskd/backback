import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ShippingDocketService } from './shipping-docket.service';
import { Response } from 'express';

@Controller('docket')
export class ShippingDocketController {
  constructor(private readonly shippingDocketService: ShippingDocketService) {}

  /**
   * Endpoint pour générer un bordereau d'envoi.
   * Exemple d'appel : POST /docket/generate avec un body JSON.
   */
  @Post('generate')
  async generate(@Body() data: any, @Res() res: Response) {
    try {
      const pdfBuffer = await this.shippingDocketService.generateDocket(data);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="bordereau.pdf"',
        'Content-Length': pdfBuffer.length,
      });
      res.send(pdfBuffer);
    } catch (error) {
      throw new HttpException('Erreur lors de la génération du bordereau', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
