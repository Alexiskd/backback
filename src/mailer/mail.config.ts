// config/mail.config.ts
export default () => ({
    mail: {
      host: process.env.SMTP_HOST || 'mxplan-vrb1lwo-1',
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || 'helpMdp@cleservice.com',
      pass: process.env.SMTP_PASS || 'Eliseo3009@',
      from: process.env.EMAIL_FROM || '"No Reply" <no-reply@cleservice.com>',
    },
  });
  