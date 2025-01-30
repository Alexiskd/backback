import { 
  Controller, 
  Get, 
  Query, 
  Put, 
  Body, 
  Post, 
  Delete, 
  BadRequestException, 
  NotFoundException 
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CatalogueCle } from '../entities/catalogue-cle.entity';
import { CreateKeyDto } from './create-key.dto';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  // Récupère les clés par marque
  @Get('cles')
  async getKeysByMarque(@Query('marque') marque: string): Promise<CatalogueCle[]> {
    console.log(`Requête reçue sur /cles avec marque: ${marque}`); // Debug
    return this.produitService.getKeysByMarque(marque);
  }

  // Récupère une clé par son nom
  @Get('cles/by-name')
  async getKeyByName(@Query('nom') nom: string): Promise<CatalogueCle | undefined> {
    console.log(`Requête reçue sur /cles/by-name avec nom: ${nom}`); // Debug
    return this.produitService.getKeyByName(nom);
  }

  // Met à jour une clé par son nom
  @Put('cles/update')
  async updateKeyByName(
    @Query('nom') nom: string,
    @Body() updates: Partial<CreateKeyDto>,
  ): Promise<CatalogueCle> {
    console.log(`Requête PUT reçue pour nom: ${nom}`); // Debug
    return this.produitService.updateKeyByName(nom, updates);
  }

  // Ajoute une nouvelle clé
  @Post('cles/add')
  async addKey(@Body() newKey: CreateKeyDto): Promise<CatalogueCle> {
    const keyToAdd: CatalogueCle = { ...newKey, id: undefined, imageUrl: newKey.imageUrl ?? '' };
    return this.produitService.addKey(keyToAdd);
  }

  // Récupère toutes les clés
  @Get('cles/all')
  async getAllKeys(): Promise<CatalogueCle[]> {
    console.log('Requête GET reçue sur /cles/all'); // Debug
    return this.produitService.getAllKeys();
  }

  // Supprime une clé par son nom
  @Delete('cles/delete')
  async deleteKeyByName(@Query('nom') nom: string): Promise<{ message: string }> {
    console.log(`Requête DELETE reçue pour nom: ${nom}`); // Debug
    await this.produitService.deleteKeyByName(nom);
    return { message: `Clé avec le nom "${nom}" a été supprimée avec succès.` };
  }
}
