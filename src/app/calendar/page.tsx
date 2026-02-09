import getDb from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { CalendarGrid } from '@/components/calendar-grid';
import type { Event } from '@/types';

export const dynamic = 'force-dynamic';

export default function CalendarPage() {
  seedDatabase();
  const db = getDb();
  const events = db
    .prepare('SELECT * FROM events ORDER BY start_date ASC')
    .all() as Event[];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Календарь</h1>
        <p className="text-muted-foreground">Все мероприятия в формате календаря</p>
      </div>
      <CalendarGrid events={events} />
    </div>
  );
}
