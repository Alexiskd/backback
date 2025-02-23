import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { DummyCacheInterceptor } from './dummy-cache.interceptor';
import { Response } from 'express';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './create-brand.dto';
import { UpdateBrandDto } from './update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // Récupérer toutes les marques
  @Get()
  @UseInterceptors(DummyCacheInterceptor)
  async findAll() {
    try {
      return await this.brandService.findAll();
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les marques:', error);
      throw error;
    }
  }

  // Nouvel endpoint pour récupérer le nombre total de marques
  @Get('count')
  async countBrands() {
    try {
      const brands = await this.brandService.findAll();
      return { count: brands.length };
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de marques:', error);
      throw error;
    }
  }

  // Nouvel endpoint pour récupérer tous les logos
  @Get('logos')
  async getAllLogos(@Res() res: Response) {
    try {
      const brands = await this.brandService.findAll();
      const logos = brands.map(brand => ({
        name: brand.nom,
        logo: brand.logo,
      }));
      return res.json(logos);
    } catch (error) {
      console.error('Erreur lors de la récupération des logos:', error);
      res.status(500).json({
        message: 'Erreur interne du serveur lors de la récupération des logos',
      });
    }
  }

  @Get('logo/:name')
  async getLogoByName(@Param('name') name: string, @Res() res: Response) {
    try {
      const brand = await this.brandService.findByName(name);
      if (!brand || !brand.logo) {
        throw new NotFoundException(`Logo non trouvé pour la marque "${name}"`);
      }
      res.setHeader('Content-Type', 'image/png');
      const logoBuffer = Buffer.from(brand.logo, 'base64');
      return res.send(logoBuffer);
    } catch (error) {
      console.error(`Erreur dans GET /brands/logo/${name}:`, error);
      res.status(error.status || 500).json({
        message:
          error.message ||
          'Erreur interne du serveur lors de la récupération du logo',
      });
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('logo', { storage: multer.memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBrandDto: CreateBrandDto,
  ) {
    try {
      const dto: CreateBrandDto = file
        ? { ...createBrandDto, logo: file.buffer.toString('base64') }
        : createBrandDto;
      return await this.brandService.create(dto);
    } catch (error) {
      console.error('Erreur lors de la création de la marque:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.brandService.findOne(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la marque avec ID ${id}:`, error);
      throw error;
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logo', { storage: multer.memoryStorage() }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    try {
      const dto: UpdateBrandDto = file
        ? { ...updateBrandDto, logo: file.buffer.toString('base64') }
        : updateBrandDto;
      return await this.brandService.update(id, dto);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la marque avec ID ${id}:`, error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.brandService.remove(id);
      return { message: `Marque avec l'id ${id} supprimée` };
    } catch (error) {
      console.error(`Erreur lors de la suppression de la marque avec ID ${id}:`, error);
      throw error;
    }
  }
}
