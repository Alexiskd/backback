import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  adresseMail: string;

  @Column('simple-array')
  cle: string[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  prix: number;

  @Column()
  telephone: string;

  @Column()
  shippingMethod: string;

  @Column('simple-array')
  typeLivraison: string[];
}
