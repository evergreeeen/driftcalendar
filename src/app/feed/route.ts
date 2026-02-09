import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { generateIcalFeed } from '@/lib/ical';
import { seedDatabase } from '@/lib/seed';
import type { Event } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  seedDatabase();
  const db = getDb();
  const events = db.prepare(
    'SELECT * FROM events ORDER BY start_date ASC'
  ).all() as Event[];

  const ical = generateIcalFeed(events);

  return new NextResponse(ical, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
