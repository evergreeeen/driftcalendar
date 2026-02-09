import nodemailer from 'nodemailer';
import type { Submission } from '@/types';

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendSubmissionNotification(submission: Submission): Promise<void> {
  if (!process.env.SMTP_HOST || !process.env.ADMIN_EMAIL) {
    console.log('[Email] SMTP not configured, skipping notification');
    return;
  }

  try {
    const transport = getTransport();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Новая заявка на мероприятие: ${submission.title}`,
      html: `
        <h2>Новая заявка на добавление мероприятия</h2>
        <p><strong>Название:</strong> ${submission.title}</p>
        <p><strong>Место:</strong> ${submission.location || 'Не указано'}</p>
        <p><strong>Даты:</strong> ${submission.start_date} - ${submission.end_date}</p>
        <p><strong>Описание:</strong> ${submission.description || 'Не указано'}</p>
        <p><strong>От:</strong> ${submission.submitter_name} (${submission.submitter_email})</p>
        <br>
        <a href="${appUrl}/admin/submissions">Перейти к заявкам</a>
      `,
    });
    console.log('[Email] Submission notification sent');
  } catch (error) {
    console.error('[Email] Failed to send notification:', error);
  }
}
