import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MapPin, Calendar } from 'lucide-react';
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

function getSeriesColor(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('rds gp')) return 'bg-red-100 text-red-800 border-red-200';
  if (t.includes('rds open')) return 'bg-orange-100 text-orange-800 border-orange-200';
  if (t.includes('rds fest')) return 'bg-pink-100 text-pink-800 border-pink-200';
  if (t.includes('сатюкап')) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (t.includes('адм')) return 'bg-green-100 text-green-800 border-green-200';
  if (t.includes('дрифтэкспо')) return 'bg-purple-100 text-purple-800 border-purple-200';
  if (t.includes('суперкубок')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-gray-100 text-gray-800 border-gray-200';
}

function getSeriesLabel(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('rds gp')) return 'RDS GP';
  if (t.includes('rds open')) return 'RDS Open';
  if (t.includes('rds fest')) return 'RDS FEST';
  if (t.includes('сатюкап')) return 'САТЮКАП';
  if (t.includes('адм')) return 'АДМ';
  if (t.includes('дрифтэкспо')) return 'ДРИФТЭКСПО';
  if (t.includes('суперкубок')) return 'СУПЕРКУБОК';
  return '';
}

export function EventCard({ event }: { event: Event }) {
  const seriesLabel = getSeriesLabel(event.title);
  const seriesColor = getSeriesColor(event.title);

  return (
    <div className="group rounded-lg border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            {seriesLabel && (
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${seriesColor}`}>
                {seriesLabel}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-base leading-tight">{event.title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDateRange(event.start_date, event.end_date)}
            </span>
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </span>
            )}
          </div>
          {event.description && (
            <p className="text-sm text-muted-foreground">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
