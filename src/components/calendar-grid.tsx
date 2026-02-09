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
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function getSeriesDot(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('rds gp')) return 'bg-red-500';
  if (t.includes('rds open')) return 'bg-orange-500';
  if (t.includes('rds fest')) return 'bg-pink-500';
  if (t.includes('сатюкап')) return 'bg-blue-500';
  if (t.includes('адм')) return 'bg-green-500';
  if (t.includes('дрифтэкспо')) return 'bg-purple-500';
  if (t.includes('суперкубок')) return 'bg-yellow-500';
  return 'bg-gray-500';
}

export function CalendarGrid({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // Start at April 2026
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  function getEventsForDay(day: Date) {
    return events.filter((event) => {
      const start = parseISO(event.start_date);
      const end = parseISO(event.end_date);
      // Set start to beginning of day, end to end of day for comparison
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return isWithinInterval(day, { start, end });
    });
  }

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  return (
    <div className="space-y-4">
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
              onClick={() => setSelectedDay(isSameDay(day, selectedDay!) ? null : day)}
              className={`relative min-h-[70px] bg-background p-1.5 text-left transition-colors hover:bg-accent ${
                !isCurrentMonth ? 'text-muted-foreground/40' : ''
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
                  {dayEvents.slice(0, 3).map((event) => (
                    <span
                      key={event.id}
                      className={`h-1.5 w-1.5 rounded-full ${getSeriesDot(event.title)}`}
                      title={event.title}
                    />
                  ))}
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
          {selectedDayEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-2 rounded-md border p-3">
              <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${getSeriesDot(event.title)}`} />
              <div>
                <p className="font-medium text-sm">{event.title}</p>
                {event.location && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
