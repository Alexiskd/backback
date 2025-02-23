import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('brand')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  nom: string;

  // Stocke le logo en Base64 dans une colonne de type text pour éviter toute troncature
  @Column({ type: 'text', nullable: true, default: null })
  logo: string;

  @BeforeInsert()
  @BeforeUpdate()
  uppercaseManufacturer() {
    if (this.nom) {
      this.nom = this.nom.toUpperCase();
    }
  }
}
