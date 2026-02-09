import getDb from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { EventCard } from '@/components/event-card';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

function groupEventsByMonth(events: Event[]): Map<string, Event[]> {
  const groups = new Map<string, Event[]>();
  for (const event of events) {
    const key = format(parseISO(event.start_date), 'yyyy-MM');
    const existing = groups.get(key) || [];
    existing.push(event);
    groups.set(key, existing);
  }
  return groups;
}

export default function HomePage() {
  seedDatabase();
  const db = getDb();
  const events = db
    .prepare("SELECT * FROM events WHERE start_date >= date('now') ORDER BY start_date ASC")
    .all() as Event[];

  const grouped = groupEventsByMonth(events);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Предстоящие мероприятия</h1>
          <p className="text-muted-foreground">
            {events.length} {events.length === 1 ? 'мероприятие' : 'мероприятий'} в расписании
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/calendar">
            <Button variant="outline" className="gap-1.5">
              <Calendar className="h-4 w-4" />
              Календарь
            </Button>
          </Link>
          <Link href="/submit">
            <Button className="gap-1.5">
              <PlusCircle className="h-4 w-4" />
              Подать заявку
            </Button>
          </Link>
        </div>
      </div>

      {Array.from(grouped.entries()).map(([monthKey, monthEvents]) => (
        <div key={monthKey} className="space-y-3">
          <h2 className="text-lg font-semibold capitalize sticky top-14 bg-background py-2 z-10 border-b">
            {format(parseISO(`${monthKey}-01`), 'LLLL yyyy', { locale: ru })}
          </h2>
          <div className="grid gap-3">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}

      {events.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Нет предстоящих мероприятий</p>
        </div>
      )}
    </div>
  );
}
