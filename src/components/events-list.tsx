'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { EventCard } from '@/components/event-card';
import { SeriesFilter } from '@/components/series-filter';
import type { Event, EventSeries } from '@/types';

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

export function EventsList({ events }: { events: Event[] }) {
  const [filterSeries, setFilterSeries] = useState<EventSeries[]>([]);

  const filtered = filterSeries.length === 0
    ? events
    : events.filter((e) => filterSeries.includes(e.series));

  const grouped = groupEventsByMonth(filtered);

  return (
    <div className="space-y-6">
      <SeriesFilter selected={filterSeries} onChange={setFilterSeries} />

      {Array.from(grouped.entries()).map(([monthKey, monthEvents]) => (
        <div key={monthKey} className="space-y-3">
          <h2 className="text-lg font-semibold capitalize sticky top-14 bg-background/95 backdrop-blur py-2 z-10 border-b border-border/50">
            {format(parseISO(`${monthKey}-01`), 'LLLL yyyy', { locale: ru })}
          </h2>
          <div className="grid gap-3">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Нет мероприятий по выбранным фильтрам</p>
        </div>
      )}
    </div>
  );
}
