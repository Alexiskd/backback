import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mailer/mail.module'; // Importer MailModule
import { ConfigModule } from '@nestjs/config';
import mailConfig from './mailer/mail.config';
import appConfig from './app.config';
import { StancerModule } from './payment/stancer.module'; // Import StancerModule
import { ProduitModule } from './produit/produit.module'; // Importer ProduitModule
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Chemin vers le dossier 'public'
      serveRoot: '/public/', // URL de base pour accéder aux fichiers statiques
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Rendre le module de configuration global
      load: [appConfig, mailConfig], // Charger les fichiers de configuration
      envFilePath: ['.env'], // Chemin vers votre fichier .env
    }),
    // Configuration directe de TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'dpg-cuec3352ng1s7387587g-a', // Hôte de la base de données
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Port PostgreSQL
      username: process.env.DB_USERNAME || 'cleservice_user', // Nom d'utilisateur
      password: process.env.DB_PASSWORD || 'LUWibq2Mqj4yqZnuQgZhBGk8exqGSIvS', // Mot de passe
      database: process.env.DB_DATABASE || 'cleservice', // Nom de la base de données
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Chargement des entités
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'], // Inclure les migrations
      synchronize: process.env.NODE_ENV === 'production' ? false : true, // Synchronisation désactivée en production
      logging: process.env.NODE_ENV !== 'production', // Logs activés seulement hors production
    }),
    MailModule, // Ajouter MailModule ici
    UserModule,
    AuthModule,
    ProduitModule, // Ajouter ProduitModule ici
    StancerModule, // Ajouter StancerModule ici
  ],
})
export class AppModule {}
