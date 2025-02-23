import { Controller, Post, Body } from '@nestjs/common';
import { SeoService } from './seo.service';
import { SeoConfiguration } from './seo.configuration';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  /**
   * Endpoint pour générer et enregistrer le SEO d'une page produit.
   * Body attendu : { name, brand, reference }
   */
  @Post('product')
  async createProductSeo(
    @Body() body: { name: string; brand: string; reference: string },
  ): Promise<SeoConfiguration> {
    const { name, brand, reference } = body;
    return this.seoService.createProductSeo(name, brand, reference);
  }

  /**
   * Endpoint pour générer et enregistrer le SEO d'une page marque.
   * Body attendu : { brand }
   */
  @Post('brand')
  async createBrandSeo(
    @Body() body: { brand: string },
  ): Promise<SeoConfiguration> {
    return this.seoService.createBrandSeo(body.brand);
  }

  /**
   * Endpoint pour générer et enregistrer le SEO de la page catalogue.
   * Body attendu : { brands: string[] }
   */
  @Post('catalog')
  async createCatalogSeo(
    @Body() body: { brands: string[] },
  ): Promise<SeoConfiguration> {
    return this.seoService.createCatalogSeo(body.brands);
  }
}
