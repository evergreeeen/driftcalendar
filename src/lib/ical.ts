import { createEvents, type EventAttributes } from 'ics';
import type { Event } from '@/types';

export function generateIcalFeed(events: Event[]): string {
  const icsEvents: EventAttributes[] = events.map((event) => {
    const start = new Date(event.start_date);
    const end = new Date(event.end_date);
    return {
      title: event.title,
      description: event.description || '',
      location: event.location || '',
      start: [
        start.getFullYear(),
        start.getMonth() + 1,
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
      ],
      end: [
        end.getFullYear(),
        end.getMonth() + 1,
        end.getDate(),
        end.getHours(),
        end.getMinutes(),
      ],
      url: event.url || undefined,
      uid: `event-${event.id}@driftcalendar`,
    };
  });

  const { error, value } = createEvents(icsEvents);
  if (error) throw error;
  return value!;
}
