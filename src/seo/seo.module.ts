import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoConfiguration } from './seo.configuration';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeoConfiguration])],
  providers: [SeoService],
  controllers: [SeoController],
})
export class SeoModule {}
