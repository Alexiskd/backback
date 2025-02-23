// src/contact-messages/create-contact-message.dto.ts
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateContactMessageDto {
  @IsNotEmpty({ message: 'Le nom est requis.' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  name: string;

  @IsNotEmpty({ message: "L'email est requis." })
  @IsEmail({}, { message: "L'email doit être valide." })
  email: string;

  @IsNotEmpty({ message: 'Le message est requis.' })
  @IsString({ message: 'Le message doit être une chaîne de caractères.' })
  message: string;
}
