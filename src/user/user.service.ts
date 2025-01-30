import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MoreThan, Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Méthode pour récupérer un utilisateur par son ID
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('Utilisateur non trouvé');
    }
    return user;
  }

  // Méthode pour l'inscription d'un utilisateur
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Vérifier si l'email existe déjà
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email déjà utilisé');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  // Méthode pour la connexion d'un utilisateur
  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    // Trouver l'utilisateur par son email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    return user;
  }

  // Méthode pour demander une réinitialisation de mot de passe
  async requestPasswordReset(resetPasswordRequestDto: ResetPasswordRequestDto) {
    const { email } = resetPasswordRequestDto;

    // Générer le code de réinitialisation et l'expiration
    const resetCode = Math.random().toString(36).slice(-6);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    // Trouver l'utilisateur par son email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Utilisateur non trouvé');
    }

    // Ajouter le code de réinitialisation et l'expiration sur l'utilisateur
    user.resetPasswordCode = resetCode;
    user.resetPasswordCodeExpiration = expiration;
    await this.userRepository.save(user);

    // Envoyer le code par email (supposons un service d'email)
    // await this.mailService.sendMail(...);

    return { message: 'Le code de réinitialisation a été envoyé par email' };
  }

  // Méthode pour réinitialiser le mot de passe
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { resetCode, newPassword } = resetPasswordDto;

    // Trouver l'utilisateur par le code de réinitialisation et vérifier l'expiration
    const user = await this.userRepository.findOne({
      where: {
        resetPasswordCode: resetCode,
        resetPasswordCodeExpiration: MoreThan(new Date()),
      },
    });
    if (!user) {
      throw new BadRequestException('Code de réinitialisation invalide ou expiré');
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe et effacer les informations de réinitialisation
    user.password = hashedPassword;
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpiration = null;

    await this.userRepository.save(user);

    return { message: 'Le mot de passe a été réinitialisé avec succès' };
  }
}
