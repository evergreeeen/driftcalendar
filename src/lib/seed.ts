import getDb from './db';
import type { EventSeries } from '@/types';

interface SeedEvent {
  title: string;
  location: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  series: EventSeries;
  start_date: string;
  end_date: string;
}

// Venues: location = track name, city = city/region
const CTVS = { location: 'ЦТВС', city: 'Москва', address: 'Москва, Проектируемый проезд 4386, д. 1, р-н Печатники', lat: 55.65166, lng: 37.68895 };
const MYACHKOVO = { location: 'ADM Raceway', city: 'Мячково', address: 'МО, Раменский р-н, д. Верхнее Мячково, аэродром', lat: 55.5666, lng: 37.9954 };
const IGORA = { location: 'Igora Drive', city: 'Санкт-Петербург', address: 'Ленинградская обл., Приозерское ш., д. 3, к. 2', lat: 60.5144, lng: 30.1942 };
const MRW = { location: 'Moscow Raceway', city: 'Волоколамск', address: 'МО, Волоколамский р-н, д. Шелудьково, 39', lat: 55.9955, lng: 36.2700 };
const ATRON = { location: 'ATRON International Circuit', city: 'Рязань', address: 'Рязанская обл., д. Секиотово, ул. Мирная, 2', lat: 54.5891, lng: 39.6198 };
const KAZAN = { location: 'KazanRing Canyon', city: 'Казань', address: 'Татарстан, трасса М7, 817 км, Высокогорский р-н', lat: 55.8664, lng: 49.2597 };
const NRING = { location: 'NRing', city: 'Нижний Новгород', address: 'Нижегородская обл., Богородский р-н, АСК НН Кольцо', lat: 56.123, lng: 43.598 };
const REDRING = { location: 'Красное Кольцо', city: 'Красноярск', address: 'Красноярский край, Емельяновский р-н, трасса Р255', lat: 56.1261, lng: 92.7397 };
const ROSTOV = { location: 'Ростов Арена', city: 'Ростов-на-Дону', address: 'г. Ростов-на-Дону, ул. Левобережная, 2Б', lat: 47.2094, lng: 39.7378 };

const events: SeedEvent[] = [
  // Апрель
  { title: '1 этап САТЮКАП', series: 'satyukap', ...CTVS, start_date: '2026-04-17T09:00:00', end_date: '2026-04-18T20:00:00' },
  { title: '1 этап RDS Open', series: 'rds_open', ...ATRON, start_date: '2026-04-25T09:00:00', end_date: '2026-04-26T20:00:00' },
  // Май
  { title: 'RDS GP — Этап 1', series: 'rds_gp', ...MRW, start_date: '2026-05-02T09:00:00', end_date: '2026-05-03T20:00:00' },
  { title: '1-й этап АДМ дрифт контест', series: 'adm', ...MYACHKOVO, start_date: '2026-05-02T09:00:00', end_date: '2026-05-03T20:00:00' },
  { title: '2 этап САТЮКАП', series: 'satyukap', ...CTVS, start_date: '2026-05-08T09:00:00', end_date: '2026-05-09T20:00:00' },
  { title: '2 этап RDS Open', series: 'rds_open', ...CTVS, start_date: '2026-05-16T09:00:00', end_date: '2026-05-17T20:00:00' },
  { title: 'RDS GP — Этап 2', series: 'rds_gp', ...IGORA, start_date: '2026-05-23T09:00:00', end_date: '2026-05-24T20:00:00' },
  // Июнь
  { title: 'ДРИФТЭКСПО', series: 'driftexpo', ...MYACHKOVO, start_date: '2026-06-06T09:00:00', end_date: '2026-06-07T20:00:00' },
  { title: '3 этап RDS Open', series: 'rds_open', ...KAZAN, start_date: '2026-06-06T09:00:00', end_date: '2026-06-07T20:00:00' },
  { title: '2-й этап АДМ дрифт контест', series: 'adm', ...MYACHKOVO, start_date: '2026-06-12T09:00:00', end_date: '2026-06-13T20:00:00' },
  { title: 'RDS GP — Этап 3', series: 'rds_gp', ...NRING, start_date: '2026-06-13T09:00:00', end_date: '2026-06-14T20:00:00' },
  { title: 'RDS FEST', series: 'rds_fest', ...MRW, start_date: '2026-06-20T09:00:00', end_date: '2026-06-20T22:00:00' },
  { title: '3 этап САТЮКАП', series: 'satyukap', ...CTVS, start_date: '2026-06-26T09:00:00', end_date: '2026-06-27T20:00:00' },
  // Июль
  { title: 'RDS GP — Этап 4', series: 'rds_gp', ...MYACHKOVO, start_date: '2026-07-11T09:00:00', end_date: '2026-07-12T20:00:00' },
  { title: '4 этап RDS Open + FEST', series: 'rds_open', ...IGORA, start_date: '2026-07-18T09:00:00', end_date: '2026-07-19T20:00:00' },
  { title: '4 этап САТЮКАП', series: 'satyukap', ...CTVS, start_date: '2026-07-24T09:00:00', end_date: '2026-07-25T20:00:00' },
  // Август
  { title: 'RDS GP — Этап 5', series: 'rds_gp', ...REDRING, start_date: '2026-08-01T09:00:00', end_date: '2026-08-02T20:00:00' },
  { title: '3-й этап АДМ дрифт контест', series: 'adm', ...MYACHKOVO, start_date: '2026-08-07T09:00:00', end_date: '2026-08-08T20:00:00' },
  { title: '5 этап RDS Open', series: 'rds_open', location: 'Уточняется', city: 'Уточняется', address: 'Уточняется', lat: 55.7558, lng: 37.6173, start_date: '2026-08-15T09:00:00', end_date: '2026-08-16T20:00:00' },
  { title: '5 этап САТЮКАП', series: 'satyukap', ...ATRON, start_date: '2026-08-22T09:00:00', end_date: '2026-08-23T20:00:00' },
  { title: 'RDS FEST', series: 'rds_fest', ...IGORA, start_date: '2026-08-22T09:00:00', end_date: '2026-08-23T20:00:00' },
  { title: 'RDS GP — Этап 6', series: 'rds_gp', ...MRW, start_date: '2026-08-29T09:00:00', end_date: '2026-08-30T20:00:00' },
  // Сентябрь
  { title: 'ДРИФТЭКСПО', series: 'driftexpo', ...MRW, start_date: '2026-09-12T09:00:00', end_date: '2026-09-13T20:00:00' },
  { title: '6 этап RDS Open', series: 'rds_open', ...MYACHKOVO, start_date: '2026-09-12T09:00:00', end_date: '2026-09-13T20:00:00' },
  { title: '6 этап САТЮКАП', series: 'satyukap', ...CTVS, start_date: '2026-09-18T09:00:00', end_date: '2026-09-19T20:00:00' },
  { title: '4-й этап АДМ дрифт контест', series: 'adm', ...MYACHKOVO, start_date: '2026-09-25T09:00:00', end_date: '2026-09-26T20:00:00' },
  { title: 'СУПЕРКУБОК RDS', series: 'supercup', ...ROSTOV, start_date: '2026-09-26T09:00:00', end_date: '2026-09-27T20:00:00' },
];

export function seedDatabase() {
  const db = getDb();
  const count = db.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };

  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO events (title, description, location, city, address, lat, lng, series, start_date, end_date)
      VALUES (@title, @description, @location, @city, @address, @lat, @lng, @series, @start_date, @end_date)
    `);

    const insertMany = db.transaction((evts: SeedEvent[]) => {
      for (const evt of evts) {
        insert.run({
          title: evt.title,
          description: null,
          location: evt.location,
          city: evt.city,
          address: evt.address,
          lat: evt.lat,
          lng: evt.lng,
          series: evt.series,
          start_date: evt.start_date,
          end_date: evt.end_date,
        });
      }
    });

    insertMany(events);
    console.log(`[Seed] Inserted ${events.length} events`);
  } else {
    console.log(`[Seed] Database already has ${count.count} events, skipping`);
  }
}
