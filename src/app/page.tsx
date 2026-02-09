import getDb from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { EventsList } from '@/components/events-list';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types';
import Link from 'next/link';
import { Calendar, PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  seedDatabase();
  const db = getDb();
  const events = db
    .prepare("SELECT * FROM events WHERE start_date >= date('now') ORDER BY start_date ASC")
    .all() as Event[];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Предстоящие мероприятия
            </span>
          </h1>
          <p className="text-muted-foreground">
            {events.length} мероприятий в расписании
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

      <EventsList events={events} />
    </div>
  );
}
