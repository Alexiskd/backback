// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './logging.interceptor'; // Import de l'intercepteur

// Ne pas importer body-parser pour les routes multipart, NestJS s'en charge déjà

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Remarque : body-parser n'est pas utilisé ici car il peut interférer avec les uploads multipart/form-data (gérés par Multer)
  /*
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  */

  // Activer CORS en autorisant les méthodes nécessaires, y compris PATCH et OPTIONS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Utilisation d'un ValidationPipe global
  // Pour déboguer l'erreur "property nom should not exist", vous pouvez temporairement mettre forbidNonWhitelisted à false,
  // mais il est préférable de corriger vos DTO afin qu'ils correspondent exactement aux propriétés attendues.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // Supprime automatiquement les propriétés non déclarées dans le DTO
      forbidNonWhitelisted: true,    // Lève une erreur si une propriété non déclarée est présente (à désactiver temporairement pour le débogage si nécessaire)
      transform: true,               // Transforme automatiquement le payload en instance du DTO
    }),
  );

  // Ajout de l'intercepteur global pour logger les requêtes
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Configuration de Swagger pour la documentation de l'API
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
