import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogueCle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cle_avec_carte_propriete', nullable: false, default: false })
  cleAvecCartePropriete: boolean;

  @Column({ name: 'prix', type: 'decimal', nullable: false, default: 0 })
  prix: number;

  @Column({ name: 'nom', type: 'varchar', length: 255, nullable: false, default: 'inconnue' })
  nom: string;

  @Column({ name: 'marque', type: 'varchar', length: 255, nullable: false, default: 'inconnue' })
  marque: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: false, default: '' })
  imageUrl: string;
}
