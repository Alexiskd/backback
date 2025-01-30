// src/auth/auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Vérification si l'email est déjà utilisé
  async checkEmail(email: string): Promise<{ exists: boolean }> {
    const user = await this.userRepository.findOne({ where: { email } });
    return { exists: !!user };
  }

  // Inscription d'un nouvel utilisateur
  async register(createUserDto: CreateUserDto) {
    const emailExists = await this.checkEmail(createUserDto.email);
    if (emailExists.exists) {
      throw new ConflictException('Email already in use');
    }

    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ ...userData, password: hashedPassword });
    await this.userRepository.save(user);

    return { message: 'User created successfully', userId: user.id };
  }

  // Connexion de l'utilisateur
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Validation de l'utilisateur via le payload JWT
  async validateUser(payload: any): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: payload.sub } });
    return user || null;
  }
}
