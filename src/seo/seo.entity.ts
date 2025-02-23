import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('seo_configuration')
export class SeoConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  // Type de page concerné (ex. "key", "brand", "catalogue")
  @Column()
  pageType: string;

  // Champs SEO classiques
  @Column({ type: 'text' })
  seoTitle: string;

  @Column({ type: 'text' })
  seoDescription: string;

  @Column({ type: 'text' })
  seoKeywords: string;

  // Champs SEO additionnels (optionnels)
  @Column({ type: 'text', nullable: true })
  seoCanonical?: string;

  @Column({ type: 'text', nullable: true })
  seoOgTitle?: string;

  @Column({ type: 'text', nullable: true })
  seoOgDescription?: string;

  @Column({ type: 'text', nullable: true })
  seoOgImage?: string;

  @Column({ type: 'text', nullable: true })
  seoTwitterTitle?: string;

  @Column({ type: 'text', nullable: true })
  seoTwitterDescription?: string;

  @Column({ type: 'text', nullable: true })
  seoRobots?: string;

  // Données contextuelles utilisées pour générer le SEO (ex. infos sur une clé, une marque ou le catalogue)
  @Column({ type: 'json', nullable: true })
  contextData?: any;

  @CreateDateColumn()
  createdAt: Date;
}
