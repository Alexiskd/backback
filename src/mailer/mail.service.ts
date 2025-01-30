import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mxplan-vrb1lwo-1',
      port: 587,
      secure: false,
      auth: {
        user: 'helpMdp@cleservice.com',
        pass: 'Eliseo3009@',
      },
    });
  }

  async sendMail(to: string, subject: string, template: string, context: any) {
    try {
      let templatePath: string;

      if (process.env.NODE_ENV === 'production') {
        templatePath = join(__dirname, '..', 'templates', `${template}.hbs`);
      } else {
        templatePath = join(__dirname, '..', '..', 'src', 'templates', `${template}.hbs`);
      }

      if (!existsSync(templatePath)) {
        throw new Error(`Template file not found at path: ${templatePath}`);
      }

      const templateSource = readFileSync(templatePath, 'utf8');
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate(context);

      const mailOptions = {
        from: '"No Reply" <helpMdp@cleservice.com>',
        to,
        subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw new InternalServerErrorException('Erreur lors de l\'envoi de l\'email');
    }
  }
}
