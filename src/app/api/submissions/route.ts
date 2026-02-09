import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { sendSubmissionNotification } from '@/lib/email';
import type { Submission } from '@/types';

export async function GET() {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const submissions = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
  return NextResponse.json(submissions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, location, start_date, end_date, url, submitter_name, submitter_email } = body;

  if (!title || !start_date || !end_date || !submitter_name || !submitter_email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = getDb();
  const result = db.prepare(`
    INSERT INTO submissions (title, description, location, start_date, end_date, url, submitter_name, submitter_email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, description || null, location || null, start_date, end_date, url || null, submitter_name, submitter_email);

  const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(result.lastInsertRowid) as Submission;

  // Send email notification (non-blocking)
  sendSubmissionNotification(submission);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
