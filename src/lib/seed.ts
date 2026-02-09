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
const MYACHKOVO = { location: 'ADM Raceway', city: 'МО', address: 'МО, Раменский р-н, д. Верхнее Мячково, аэродром', lat: 55.5666, lng: 37.9954 };
const IGORA = { location: 'Igora Drive', city: 'Санкт-Петербург', address: 'Ленинградская обл., Приозерское ш., д. 3, к. 2', lat: 60.5144, lng: 30.1942 };
const MRW = { location: 'Moscow Raceway', city: 'МО', address: 'МО, Волоколамский р-н, д. Шелудьково, 39', lat: 55.9955, lng: 36.2700 };
const ATRON = { location: 'ATRON International Circuit', city: 'Рязань', address: 'Рязанская обл., д. Секиотово, ул. Мирная, 2', lat: 54.5891, lng: 39.6198 };
const KAZAN = { location: 'KazanRing Canyon', city: 'Казань', address: 'Татарстан, трасса М7, 817 км, Высокогорский р-н', lat: 55.8664, lng: 49.2597 };
const NRING = { location: 'NRing', city: 'Нижний Новгород', address: 'Нижегородская обл., Богородский р-н, АСК НН Кольцо', lat: 56.123, lng: 43.598 };
const REDRING = { location: 'Красное Кольцо', city: 'Красноярск', address: 'Красноярский край, Емельяновский р-н, трасса Р255', lat: 56.1261, lng: 92.7397 };
const ROSTOV = { location: 'Ростов Арена', city: 'Ростов-на-Дону', address: 'г. Ростов-на-Дону, ул. Левобережная, 2Б', lat: 47.2094, lng: 39.7378 };
const SHANGHAI = { location: 'TBA', city: 'Шанхай', address: 'Shanghai, China', lat: 31.2304, lng: 121.4737 };
const CHINA_TBA = { location: 'TBA', city: 'Китай', address: 'China, TBA', lat: 35.8617, lng: 104.1954 };

// D1GP venues (Japan)
const AICHI_SKY_EXPO = { location: 'Aichi Sky Expo', city: 'Токонамэ', address: 'Aichi Prefecture, Tokoname, Centrair, 1-10-22', lat: 34.8544, lng: 136.8115 };
const TSUKUBA = { location: 'Tsukuba Circuit', city: 'Симоцума', address: 'Ibaraki Prefecture, Shimotsuma, Murakuri, 5050-19', lat: 36.1039, lng: 139.9803 };
const EBISU = { location: 'Ebisu Circuit', city: 'Нихонмацу', address: 'Fukushima Prefecture, Nihonmatsu, Sawamatsukura, Manoyama', lat: 37.6291, lng: 140.3477 };
const AUTOPOLIS = { location: 'Autopolis', city: 'Хита', address: 'Oita Prefecture, Hita, Kamitsue, Kozurubaru', lat: 33.1550, lng: 131.0247 };
const MAKUHARI = { location: 'Makuhari Messe', city: 'Тиба', address: 'Chiba Prefecture, Chiba, Mihama-ku, Nakase 2-1', lat: 35.6482, lng: 140.0340 };
const FUJI_SW = { location: 'Fuji Speedway', city: 'Ояма', address: 'Shizuoka Prefecture, Sunto District, Oyama, 694', lat: 35.3719, lng: 138.9272 };
const JAPAN_TBA = { location: 'TBA', city: 'Япония', address: 'Japan, TBA', lat: 36.2048, lng: 138.2529 };

// Drift Masters venues (Europe)
const VALLELUNGA = { location: 'Autodromo Vallelunga', city: 'Рим', address: 'Via Juan Manuel Fangio, 00063 Campagnano di Roma, Italy', lat: 42.1303, lng: 12.3058 };
const JARAMA = { location: 'Circuito del Jarama', city: 'Мадрид', address: 'Carretera A-1, Km. 28, 28700 San Sebastián de los Reyes, Spain', lat: 40.6172, lng: -3.5861 };
const MONDELLO = { location: 'Mondello Park', city: 'Килдэр', address: 'Donore, Naas, Co. Kildare, Ireland', lat: 53.2525, lng: -6.7467 };
const AHVENISTO = { location: 'Ahvenisto Race Circuit', city: 'Хямеэнлинна', address: 'Ahvenistontie, 13130 Hämeenlinna, Finland', lat: 61.0028, lng: 24.4333 };
const BIKERNIEKI = { location: 'Bikernieki Circuit', city: 'Рига', address: 'Biķernieku iela 2, Rīga, LV-1079, Latvia', lat: 56.9625, lng: 24.1986 };
const FERROPOLIS = { location: 'Ferropolis', city: 'Дессау', address: 'Ferropolisstraße 1, 06773 Gräfenhainichen, Germany', lat: 51.7178, lng: 12.4544 };
const PGE_NARODOWY = { location: 'PGE Narodowy', city: 'Варшава', address: 'al. Ks. J. Poniatowskiego 1, 03-901 Warszawa, Poland', lat: 52.2396, lng: 21.0453 };

// Formula DRIFT venues (USA)
const LONG_BEACH = { location: 'Streets of Long Beach', city: 'Лонг-Бич', address: 'E Shoreline Dr, Long Beach, CA 90802, USA', lat: 33.7641, lng: -118.1898 };
const ROAD_ATLANTA = { location: 'Road Atlanta', city: 'Атланта', address: '5300 Winder Hwy, Braselton, GA 30517, USA', lat: 34.1466, lng: -83.8125 };
const ORLANDO_SW = { location: 'Orlando Speed World', city: 'Орландо', address: '19164 E Colonial Dr, Orlando, FL 32820, USA', lat: 28.5453, lng: -81.1164 };
const STAFFORD_MS = { location: 'Stafford Motor Speedway', city: 'Стаффорд', address: '55 West St, Stafford Springs, CT 06076, USA', lat: 41.9606, lng: -72.3042 };
const LUCAS_OIL = { location: 'Lucas Oil Indianapolis Raceway Park', city: 'Индианаполис', address: '10267 E US Hwy 136, Indianapolis, IN 46234, USA', lat: 39.7903, lng: -86.3397 };
const EVERGREEN = { location: 'Evergreen Speedway', city: 'Сиэтл', address: '14405 179th Ave SE, Monroe, WA 98272, USA', lat: 47.8609, lng: -121.9672 };
const LVMS = { location: 'Las Vegas Motor Speedway', city: 'Лас-Вегас', address: '7000 Las Vegas Blvd N, Las Vegas, NV 89115, USA', lat: 36.2719, lng: -115.0103 };

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
  // Royal Drift Series
  { title: 'Royal Drift Series — Round 1', series: 'royal_drift', ...SHANGHAI, start_date: '2026-06-06T09:00:00', end_date: '2026-06-07T20:00:00' },
  { title: 'Royal Drift Series — Round 2', series: 'royal_drift', ...CHINA_TBA, start_date: '2026-07-04T09:00:00', end_date: '2026-07-05T20:00:00' },
  { title: 'Royal Drift Series — Round 3', series: 'royal_drift', ...CHINA_TBA, start_date: '2026-09-05T09:00:00', end_date: '2026-09-06T20:00:00' },
  { title: 'Royal Drift Series — Round 4', series: 'royal_drift', ...SHANGHAI, start_date: '2026-10-10T09:00:00', end_date: '2026-10-11T20:00:00' },
  { title: 'Royal Drift Series — Round 5', series: 'royal_drift', ...SHANGHAI, start_date: '2026-10-30T09:00:00', end_date: '2026-10-31T20:00:00' },
  // D1 Grand Prix
  { title: 'D1GP Kick Off Drift', series: 'd1gp', ...MAKUHARI, start_date: '2026-01-10T09:00:00', end_date: '2026-01-11T20:00:00' },
  { title: 'D1GP Rd. Zero', series: 'd1gp', ...FUJI_SW, start_date: '2026-04-19T09:00:00', end_date: '2026-04-19T20:00:00' },
  { title: 'D1GP — Round 1 & 2', series: 'd1gp', ...AICHI_SKY_EXPO, start_date: '2026-05-08T09:00:00', end_date: '2026-05-10T20:00:00' },
  { title: 'D1GP — Round 3 & 4', series: 'd1gp', ...TSUKUBA, start_date: '2026-06-26T09:00:00', end_date: '2026-06-28T20:00:00' },
  { title: 'D1GP — Round 5 & 6', series: 'd1gp', ...EBISU, start_date: '2026-09-25T09:00:00', end_date: '2026-09-27T20:00:00' },
  { title: 'D1GP — Round 7 & 8', series: 'd1gp', ...AUTOPOLIS, start_date: '2026-10-23T09:00:00', end_date: '2026-10-25T20:00:00' },
  { title: 'D1GP — Round 9 & 10', series: 'd1gp', ...JAPAN_TBA, start_date: '2026-11-13T09:00:00', end_date: '2026-11-15T20:00:00' },
  // Drift Masters
  { title: 'Drift Masters — Round 1', series: 'drift_masters', ...VALLELUNGA, start_date: '2026-05-01T09:00:00', end_date: '2026-05-02T20:00:00' },
  { title: 'Drift Masters — Round 2', series: 'drift_masters', ...JARAMA, start_date: '2026-05-16T09:00:00', end_date: '2026-05-17T20:00:00' },
  { title: 'Drift Masters — Round 3', series: 'drift_masters', ...MONDELLO, start_date: '2026-06-13T09:00:00', end_date: '2026-06-14T20:00:00' },
  { title: 'Drift Masters — Round 4', series: 'drift_masters', ...AHVENISTO, start_date: '2026-07-11T09:00:00', end_date: '2026-07-12T20:00:00' },
  { title: 'Drift Masters — Round 5', series: 'drift_masters', ...BIKERNIEKI, start_date: '2026-07-24T09:00:00', end_date: '2026-07-25T20:00:00' },
  { title: 'Drift Masters — Round 6', series: 'drift_masters', ...FERROPOLIS, start_date: '2026-08-13T09:00:00', end_date: '2026-08-14T20:00:00' },
  { title: 'Drift Masters — Round 7', series: 'drift_masters', ...PGE_NARODOWY, start_date: '2026-09-11T09:00:00', end_date: '2026-09-12T20:00:00' },
  // Formula DRIFT
  { title: 'Formula DRIFT — Round 1', series: 'formula_drift', ...LONG_BEACH, start_date: '2026-04-10T09:00:00', end_date: '2026-04-11T20:00:00' },
  { title: 'Formula DRIFT — Round 2', series: 'formula_drift', ...ROAD_ATLANTA, start_date: '2026-05-07T09:00:00', end_date: '2026-05-09T20:00:00' },
  { title: 'Formula DRIFT — Round 3', series: 'formula_drift', ...ORLANDO_SW, start_date: '2026-05-29T09:00:00', end_date: '2026-05-30T20:00:00' },
  { title: 'Formula DRIFT — Round 4', series: 'formula_drift', ...STAFFORD_MS, start_date: '2026-06-18T09:00:00', end_date: '2026-06-20T20:00:00' },
  { title: 'Formula DRIFT — Round 5', series: 'formula_drift', ...LUCAS_OIL, start_date: '2026-07-30T09:00:00', end_date: '2026-08-01T20:00:00' },
  { title: 'Formula DRIFT — Round 6', series: 'formula_drift', ...EVERGREEN, start_date: '2026-08-21T09:00:00', end_date: '2026-08-22T20:00:00' },
  { title: 'Formula DRIFT — Round 7', series: 'formula_drift', ...LVMS, start_date: '2026-09-24T09:00:00', end_date: '2026-09-26T20:00:00' },
  { title: 'Formula DRIFT — Round 8 (Finals)', series: 'formula_drift', ...LONG_BEACH, start_date: '2026-10-23T09:00:00', end_date: '2026-10-24T20:00:00' },
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
