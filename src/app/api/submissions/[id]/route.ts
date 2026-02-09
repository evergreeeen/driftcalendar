import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { verifySession } from '@/lib/auth';
import type { Submission } from '@/types';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status } = body as { status: 'approved' | 'rejected' };

  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const db = getDb();
  db.prepare('UPDATE submissions SET status = ? WHERE id = ?').run(status, id);

  if (status === 'approved') {
    const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(id) as Submission;
    if (submission) {
      db.prepare(`
        INSERT INTO events (title, description, location, address, start_date, end_date, url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        submission.title,
        submission.description,
        submission.location,
        submission.address,
        submission.start_date,
        submission.end_date,
        submission.url
      );
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  db.prepare('DELETE FROM submissions WHERE id = ?').run(id);

  return NextResponse.json({ success: true });
}
