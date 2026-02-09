'use client';

import { useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { EventCard } from '@/components/event-card';
import { EventFilters } from '@/components/event-filters';
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
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  const [filterCities, setFilterCities] = useState<string[]>([]);
  const [filterTracks, setFilterTracks] = useState<string[]>([]);

  const countries = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => {
      if (e.country) set.add(e.country);
    });
    return Array.from(set).sort();
  }, [events]);

  const cities = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => {
      if (e.city) set.add(e.city);
    });
    return Array.from(set).sort();
  }, [events]);

  const tracks = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => {
      if (e.location) set.add(e.location);
    });
    return Array.from(set).sort();
  }, [events]);

  const filtered = useMemo(() => {
    let result = events;
    if (filterSeries.length > 0) {
      result = result.filter((e) => filterSeries.includes(e.series));
    }
    if (filterCountries.length > 0) {
      result = result.filter((e) => e.country && filterCountries.includes(e.country));
    }
    if (filterCities.length > 0) {
      result = result.filter((e) => e.city && filterCities.includes(e.city));
    }
    if (filterTracks.length > 0) {
      result = result.filter((e) => e.location && filterTracks.includes(e.location));
    }
    return result;
  }, [events, filterSeries, filterCountries, filterCities, filterTracks]);

  const grouped = groupEventsByMonth(filtered);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0 space-y-6">
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

      <aside className="lg:w-60 shrink-0 order-first lg:order-last">
        <div className="lg:sticky lg:top-20 rounded-lg border bg-card p-4">
          <EventFilters
            filterSeries={filterSeries}
            onSeriesChange={setFilterSeries}
            filterCountries={filterCountries}
            onCountriesChange={setFilterCountries}
            countries={countries}
            filterCities={filterCities}
            onCitiesChange={setFilterCities}
            cities={cities}
            filterTracks={filterTracks}
            onTracksChange={setFilterTracks}
            tracks={tracks}
          />
        </div>
      </aside>
    </div>
  );
}
