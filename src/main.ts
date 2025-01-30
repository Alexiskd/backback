// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Activer CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Autoriser les origines définies dans l'env
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Permet l'envoi de cookies ou informations d'identification
  });

  // Utiliser des pipes globaux pour la validation des données
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Supprime les propriétés non spécifiées dans le DTO
    forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non spécifiées
    transform: true, // Convertit les données au bon type
  }));

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Stancer')
    .setDescription('API pour générer des pages de paiement avec Stancer')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application running on http://localhost:${port}`);
}

bootstrap();
