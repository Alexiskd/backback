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
      url: 'postgresql://cleservice_user:LUWibq2Mqj4yqZnuQgZhBGk8exqGSIvS@dpg-cuec3352ng1s7387587g-a.oregon-postgres.render.com/cleservice', // Utilise l'URL complète de la base de données
      autoLoadEntities: true,
      synchronize: true, // À utiliser avec précaution en production
      ssl: {
        rejectUnauthorized: false, // Nécessaire pour certaines configurations SSL
      },
    }),
    MailModule, // Ajouter MailModule ici
    UserModule,
    AuthModule,
    ProduitModule, // Ajouter ProduitModule ici
    StancerModule, // Ajouter StancerModule ici
  ],
})
export class AppModule {}
