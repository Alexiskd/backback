
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Token } from './token.entity';  // Correcting path
import { MailService } from '../mailer/mail.service';  // Assuming mail service exists

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
