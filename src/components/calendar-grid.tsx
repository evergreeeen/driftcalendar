'use client';

import { useState } from 'react';
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
import { SeriesFilter } from '@/components/series-filter';
import { SERIES_CONFIG } from '@/types';
import type { Event, EventSeries } from '@/types';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function CalendarGrid({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [filterSeries, setFilterSeries] = useState<EventSeries[]>([]);

  const filtered = filterSeries.length === 0
    ? events
    : events.filter((e) => filterSeries.includes(e.series));

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
    <div className="space-y-4">
      <SeriesFilter selected={filterSeries} onChange={setFilterSeries} />

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
              className={`relative min-h-[70px] bg-card p-1.5 text-left transition-colors hover:bg-accent ${
                !isCurrentMonth ? 'text-muted-foreground/30' : ''
              } ${isSelected ? 'ring-2 ring-primary ring-inset' : ''}`}
            >
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  isToday ? 'bg-primary text-primary-foreground font-bold' : ''
                }`}
              >
                {format(day, 'd')}
              </span>
              {dayEvents.length > 0 && (
                <div className="mt-0.5 flex flex-wrap gap-0.5">
                  {dayEvents.slice(0, 3).map((event) => {
                    const cfg = SERIES_CONFIG[event.series] || SERIES_CONFIG.other;
                    return (
                      <span
                        key={event.id}
                        className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
                        title={event.title}
                      />
                    );
                  })}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">
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
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{event.title}</p>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  {event.location && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {event.location}
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
  );
}
