import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class ShippingDocketService {
  /**
   * Génère un bordereau d'envoi au format PDF.
   * 
   * Le destinataire est fixe : Maison Bouvet, 20 rue de Lévis, Paris 17ᵉ.
   * L'expéditeur et, éventuellement, le point relais Collisimo sont renseignés via le paramètre "data".
   *
   * @param data Les données nécessaires pour remplir le bordereau :
   *  - senderName : Nom de l'expéditeur
   *  - senderAddress : Adresse de l'expéditeur
   *  - senderPhone : Téléphone de l'expéditeur (optionnel)
   *  - relayPoint : (optionnel) objet contenant les informations du point relais Collisimo
   *      - name : Nom du point relais
   *      - address : Adresse du point relais
   *  - details : (optionnel) Détails supplémentaires (exemple : description du colis)
   * @returns Un Buffer contenant le PDF généré.
   */
  async generateDocket(data: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Uint8Array[] = [];

      // Accumulation des chunks générés par PDFKit
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', (err) => reject(err));

      // Titre du document
      doc.fontSize(20).text("Bordereau d'envoi", { align: 'center' });
      doc.moveDown();

      // Section Expéditeur
      doc.fontSize(14).text("Expéditeur :");
      if (data.senderName) {
        doc.fontSize(12).text(`Nom : ${data.senderName}`);
      }
      if (data.senderAddress) {
        doc.fontSize(12).text(`Adresse : ${data.senderAddress}`);
      }
      if (data.senderPhone) {
        doc.fontSize(12).text(`Téléphone : ${data.senderPhone}`);
      }
      doc.moveDown();

      // Section Point Relais Collisimo (optionnelle)
      if (data.relayPoint) {
        doc.fontSize(14).text("Point Relais Collisimo :");
        if (data.relayPoint.name) {
          doc.fontSize(12).text(`Nom : ${data.relayPoint.name}`);
        }
        if (data.relayPoint.address) {
          doc.fontSize(12).text(`Adresse : ${data.relayPoint.address}`);
        }
        doc.moveDown();
      }

      // Section Destinataire (fixe)
      doc.fontSize(14).text("Destinataire :");
      doc.fontSize(12).text("Maison Bouvet");
      doc.fontSize(12).text("20 rue de Lévis, Paris 17ᵉ");
      doc.moveDown();

      // Section Détails supplémentaires (optionnelle)
      if (data.details) {
        doc.fontSize(12).text("Détails supplémentaires :");
        doc.fontSize(12).text(data.details);
        doc.moveDown();
      }

      // Finalisation du PDF
      doc.end();
    });
  }
}
