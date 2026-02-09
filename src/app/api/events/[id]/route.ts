import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const event = db.prepare('SELECT * FROM events WHERE id = ?').get(id);

  if (!event) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, description, location, address, lat, lng, series, start_date, end_date, url } = body;

  const db = getDb();
  db.prepare(`
    UPDATE events
    SET title = ?, description = ?, location = ?, address = ?, lat = ?, lng = ?, series = ?, start_date = ?, end_date = ?, url = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(title, description || null, location || null, address || null, lat || null, lng || null, series || 'other', start_date, end_date, url || null, id);

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  db.prepare('DELETE FROM events WHERE id = ?').run(id);

  return NextResponse.json({ success: true });
}
