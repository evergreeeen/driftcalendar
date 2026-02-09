import { createEvents, type EventAttributes } from 'ics';
import type { Event } from '@/types';
import { SERIES_CONFIG } from '@/types';

export function generateIcalFeed(events: Event[]): string {
  const icsEvents: EventAttributes[] = events.map((event) => {
    const start = new Date(event.start_date);
    const end = new Date(event.end_date);
    const seriesLabel = SERIES_CONFIG[event.series]?.label || '';
    const locationParts = [event.location, event.address].filter(Boolean).join(', ');

    return {
      title: seriesLabel ? `[${seriesLabel}] ${event.title}` : event.title,
      description: event.description || '',
      location: locationParts,
      geo: event.lat && event.lng ? { lat: event.lat, lon: event.lng } : undefined,
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

  // Inject subscription headers after VCALENDAR begin for auto-refresh
  let ical = value!;
  const subscriptionHeaders = [
    'X-WR-CALNAME:Drift Calendar',
    'X-WR-CALDESC:Календарь дрифт-мероприятий',
    'METHOD:PUBLISH',
    'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
    'X-PUBLISHED-TTL:PT1H',
  ].join('\r\n');

  ical = ical.replace(
    'BEGIN:VCALENDAR\r\nVERSION:2.0',
    `BEGIN:VCALENDAR\r\nVERSION:2.0\r\n${subscriptionHeaders}`
  );

  return ical;
}
