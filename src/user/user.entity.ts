import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Token } from './token.entity';  // Assurez-vous que le chemin est correct

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  resetPasswordCode: string;  // Code de réinitialisation du mot de passe

  @Column({ nullable: true })
  resetPasswordCodeExpiration: Date;  // Date d'expiration du code de réinitialisation

  @OneToMany(() => Token, token => token.user)
  tokens: Token[];  // Relation OneToMany avec l'entité Token

  // Autres propriétés et méthodes...
}
