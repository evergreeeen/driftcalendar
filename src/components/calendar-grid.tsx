'use client';

import { useState, useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  isWithinInterval,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventFilters } from '@/components/event-filters';
import { SERIES_CONFIG } from '@/types';
import type { Event, EventSeries } from '@/types';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function CalendarGrid({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [filterSeries, setFilterSeries] = useState<EventSeries[]>([]);
  const [filterCities, setFilterCities] = useState<string[]>([]);
  const [filterTracks, setFilterTracks] = useState<string[]>([]);

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
    if (filterCities.length > 0) {
      result = result.filter((e) => e.city && filterCities.includes(e.city));
    }
    if (filterTracks.length > 0) {
      result = result.filter((e) => e.location && filterTracks.includes(e.location));
    }
    return result;
  }, [events, filterSeries, filterCities, filterTracks]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  function getEventsForDay(day: Date) {
    return filtered.filter((event) => {
      const start = parseISO(event.start_date);
      const end = parseISO(event.end_date);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return isWithinInterval(day, { start, end });
    });
  }

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold capitalize">
            {format(currentDate, 'LLLL yyyy', { locale: ru })}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-px rounded-lg border bg-border overflow-hidden">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = selectedDay && isSameDay(day, selectedDay);
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`relative min-h-[90px] bg-card p-1 text-left transition-colors hover:bg-accent/50 ${
                  !isCurrentMonth ? 'opacity-30' : ''
                } ${isSelected ? 'ring-2 ring-primary ring-inset' : ''}`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] mb-0.5 ${
                    isToday ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground'
                  }`}
                >
                  {format(day, 'd')}
                </span>
                {dayEvents.length > 0 && (
                  <div className="flex flex-col gap-px">
                    {dayEvents.slice(0, 3).map((event) => {
                      const cfg = SERIES_CONFIG[event.series] || SERIES_CONFIG.other;
                      return (
                        <div
                          key={event.id}
                          className={`rounded px-1 py-px text-[9px] leading-tight font-medium truncate ${cfg.dot} text-white`}
                          title={`${event.title} — ${[event.location, event.city].filter(Boolean).join(', ')}`}
                        >
                          <span className="hidden sm:inline">{event.title}</span>
                          <span className="sm:hidden">{(SERIES_CONFIG[event.series] || SERIES_CONFIG.other).label}</span>
                        </div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <span className="text-[9px] text-muted-foreground text-center">
                        +{dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {selectedDay && selectedDayEvents.length > 0 && (
          <div className="space-y-2 rounded-lg border p-4">
            <h3 className="font-medium">
              {format(selectedDay, 'd MMMM yyyy', { locale: ru })}
            </h3>
            {selectedDayEvents.map((event) => {
              const cfg = SERIES_CONFIG[event.series] || SERIES_CONFIG.other;
              return (
                <div key={event.id} className="flex items-start gap-3 rounded-md border p-3 bg-card">
                  <span className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{event.title}</p>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>
                    {(event.location || event.city) && (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {[event.location, event.city].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    {event.address && (
                      <p className="text-[11px] text-muted-foreground/60 mt-0.5">{event.address}</p>
                    )}
                  </div>
                  {event.lat && event.lng && (
                    <a
                      href={`https://yandex.ru/maps/?pt=${event.lng},${event.lat}&z=14&l=map`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 rounded border p-1.5 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                      title="На карте"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <aside className="lg:w-60 shrink-0 order-first lg:order-last">
        <div className="lg:sticky lg:top-20 rounded-lg border bg-card p-4">
          <EventFilters
            filterSeries={filterSeries}
            onSeriesChange={setFilterSeries}
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
