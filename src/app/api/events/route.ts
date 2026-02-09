import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { seedDatabase } from '@/lib/seed';

export async function GET(request: Request) {
  seedDatabase();
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  const events = all
    ? db.prepare('SELECT * FROM events ORDER BY start_date ASC').all()
    : db.prepare("SELECT * FROM events WHERE start_date >= date('now') ORDER BY start_date ASC").all();

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, location, city, country, address, lat, lng, series, start_date, end_date, url } = body;

  if (!title || !start_date || !end_date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = getDb();
  const result = db.prepare(`
    INSERT INTO events (title, description, location, city, country, address, lat, lng, series, start_date, end_date, url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, description || null, location || null, city || null, country || null, address || null, lat || null, lng || null, series || 'other', start_date, end_date, url || null);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
