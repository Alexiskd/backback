import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { CatalogueCle } from '../entities/catalogue-cle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogueCle])],
  providers: [ProduitService],
  controllers: [ProduitController],
})
export class ProduitModule {}
