// src/contact-messages/contact-messages.controller.ts
import { Controller, Get, Post, Body, HttpCode, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './create-contact-message.dto';

@Controller('contact-messages')
export class ContactMessagesController {
  constructor(private readonly contactMessagesService: ContactMessagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createContactMessageDto: CreateContactMessageDto) {
    try {
      return await this.contactMessagesService.create(createContactMessageDto);
    } catch (error) {
      console.error('Erreur lors de la création d\'un message de contact :', error);
      throw new InternalServerErrorException('Erreur interne lors de la création du message.');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.contactMessagesService.findAll();
    } catch (error) {
      console.error('Erreur lors de la récupération des messages de contact :', error);
      throw new InternalServerErrorException('Erreur interne lors de la récupération des messages.');
    }
  }
}
