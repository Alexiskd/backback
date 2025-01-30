// produit.service.ts
import { 
  BadRequestException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogueCle } from '../entities/catalogue-cle.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(CatalogueCle)
    private readonly catalogueCleRepository: Repository<CatalogueCle>,
  ) {}

  // Récupère les clés par marque
  async getKeysByMarque(marque: string): Promise<CatalogueCle[]> {
    console.log(`Service: Recherche des clés pour la marque: ${marque}`); // Debug
    return this.catalogueCleRepository.find({ where: { marque: marque || '' } });
  }

  // Récupère une clé par son nom
  async getKeyByName(nom: string): Promise<CatalogueCle | undefined> {
    console.log(`Service: Recherche de la clé avec le nom: ${nom}`); // Debug
    return this.catalogueCleRepository.findOne({ where: { nom } });
  }

  // Met à jour une clé par son nom
  async updateKeyByName(
    nom: string,
    updates: Partial<CatalogueCle>,
  ): Promise<CatalogueCle> {
    const key = await this.catalogueCleRepository.findOne({ where: { nom } });
    if (!key) {
      throw new NotFoundException(`Clé avec le nom "${nom}" introuvable`);
    }
    Object.assign(key, updates);
    return this.catalogueCleRepository.save(key);
  }

  // Ajoute une nouvelle clé
  async addKey(newKey: CatalogueCle): Promise<CatalogueCle> {
    const existingKey = await this.catalogueCleRepository.findOne({ where: { nom: newKey.nom } });
    if (existingKey) {
      throw new BadRequestException(`Une clé avec le nom "${newKey.nom}" existe déjà.`);
    }
    return this.catalogueCleRepository.save(newKey);
  }

  // Récupère toutes les clés
  async getAllKeys(): Promise<CatalogueCle[]> {
    console.log('Service: Récupération de toutes les clés'); // Debug
    return this.catalogueCleRepository.find();
  }

  // Supprime une clé par son nom
  async deleteKeyByName(nom: string): Promise<void> {
    console.log(`Service: Suppression de la clé avec le nom: ${nom}`); // Debug
    const result = await this.catalogueCleRepository.delete({ nom });

    if (result.affected === 0) {
      throw new NotFoundException(`Clé avec le nom "${nom}" introuvable`);
    }

    console.log(`Service: Clé avec le nom "${nom}" supprimée avec succès`); // Debug
  }
}
