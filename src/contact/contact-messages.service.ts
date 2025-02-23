// src/contact-messages/contact-messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './message.entity';
import { CreateContactMessageDto } from './create-contact-message.dto';

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectRepository(ContactMessage)
    private contactMessageRepository: Repository<ContactMessage>,
  ) {}

  async create(createContactMessageDto: CreateContactMessageDto): Promise<ContactMessage> {
    const contactMessage = this.contactMessageRepository.create(createContactMessageDto);
    return await this.contactMessageRepository.save(contactMessage);
  }

  async findAll(): Promise<ContactMessage[]> {
    return await this.contactMessageRepository.find();
  }
}
