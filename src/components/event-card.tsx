import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MapPin, Calendar, Navigation } from 'lucide-react';
import { SERIES_CONFIG } from '@/types';
import type { Event } from '@/types';

function formatDateRange(startDate: string, endDate: string): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const startDay = format(start, 'd', { locale: ru });
  const endDay = format(end, 'd', { locale: ru });
  const month = format(start, 'MMMM', { locale: ru });
  const year = format(start, 'yyyy');

  if (startDay === endDay) {
    return `${startDay} ${month} ${year}`;
  }
  return `${startDay}-${endDay} ${month} ${year}`;
}

export function EventCard({ event }: { event: Event }) {
  const config = SERIES_CONFIG[event.series] || SERIES_CONFIG.other;

  return (
    <div className="group rounded-lg border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
              {config.label}
            </span>
          </div>
          <h3 className="font-semibold text-base leading-tight">{event.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-primary/70" />
              {formatDateRange(event.start_date, event.end_date)}
            </span>
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary/70" />
                {event.location}
              </span>
            )}
          </div>
          {event.address && (
            <p className="text-xs text-muted-foreground/70">{event.address}</p>
          )}
          {event.description && (
            <p className="text-sm text-muted-foreground">{event.description}</p>
          )}
        </div>
        {event.lat && event.lng && (
          <a
            href={`https://yandex.ru/maps/?pt=${event.lng},${event.lat}&z=14&l=map`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 rounded-md border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            title="Показать на карте"
          >
            <Navigation className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
