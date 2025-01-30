// src/stancer/stancer.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StancerController } from './stancer.controller';
import { StancerService } from './stancer.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  controllers: [StancerController],
  providers: [StancerService],
})
export class StancerModule {}
