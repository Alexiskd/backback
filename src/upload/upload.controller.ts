import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  @Post('pdf')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          // __dirname dans dist/upload, donc on remonte pour avoir dist/uploads/pdf
          const uploadPath = join(__dirname, '..', 'uploads', 'pdf');
          console.log('uploadPath:', uploadPath);
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
            console.log('Dossier créé:', uploadPath);
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `justificatif-${uniqueSuffix}${extension}`;
          console.log('Fichier enregistré sous:', filename);
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new InternalServerErrorException('Le fichier doit être un PDF.'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new InternalServerErrorException("Aucun fichier n'a été uploadé.");
    }
    return { filePath: join('uploads', 'pdf', file.filename) };
  }
}
