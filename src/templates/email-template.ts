export const emailTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #0073e6;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
    }
    .footer {
      background-color: #0073e6;
      color: #ffffff;
      text-align: center;
      padding: 10px;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      color: #ffffff;
      background-color: #0073e6;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #005bb5;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      Confirmation de votre commande
    </div>
    <div class="content">
      <p>Bonjour <strong>{{nom}}</strong>,</p>

      <p>Nous vous remercions pour votre commande sur <strong>CléService.com</strong>.</p>

      <h3>Récapitulatif de votre commande :</h3>
      <ul>
        <li><strong>Produits commandés :</strong> {{cle}}</li>
        <li><strong>Prix total :</strong> {{prix}} €</li>
      </ul>

      <p>{{livraisonMessage}}</p>

      <p>Pour toute question, vous pouvez nous contacter à l'adresse email suivante : <a href="mailto:contact@cleservice.com">contact@cleservice.com</a> ou par téléphone au <strong>01 42 67 47 28</strong>.</p>

      <a href="https://www.cleservice.com" class="button">Visitez notre site</a>
    </div>
    <div class="footer">
      &copy; 2025 CléService.com - Tous droits réservés
    </div>
  </div>
</body>
</html>
`;
