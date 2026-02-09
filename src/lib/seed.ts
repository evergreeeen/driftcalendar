import getDb from './db';

const events = [
  // Апрель
  { title: '1 этап САТЮКАП', location: 'ЦТСВ', start_date: '2026-04-17T09:00:00', end_date: '2026-04-18T20:00:00' },
  { title: '1 этап RDS Open', location: 'Рязань', start_date: '2026-04-25T09:00:00', end_date: '2026-04-26T20:00:00' },
  // Май
  { title: 'RDS GP', location: 'МРВ', start_date: '2026-05-02T09:00:00', end_date: '2026-05-03T20:00:00' },
  { title: '1й этап АДМ дрифт контест', location: 'Мячково', start_date: '2026-05-02T09:00:00', end_date: '2026-05-03T20:00:00' },
  { title: '2 этап САТЮКАП', location: 'ЦТСВ', start_date: '2026-05-08T09:00:00', end_date: '2026-05-09T20:00:00' },
  { title: '2 этап RDS Open', location: 'ЦТСВ', start_date: '2026-05-16T09:00:00', end_date: '2026-05-17T20:00:00' },
  { title: 'RDS GP', location: 'IGORA, СПБ', start_date: '2026-05-23T09:00:00', end_date: '2026-05-24T20:00:00' },
  // Июнь
  { title: 'ДРИФТЭКСПО', location: 'Мячково', start_date: '2026-06-06T09:00:00', end_date: '2026-06-07T20:00:00' },
  { title: 'RDS Open', location: 'Казань', start_date: '2026-06-06T09:00:00', end_date: '2026-06-07T20:00:00' },
  { title: '2й этап АДМ дрифт контест', location: 'Мячково', start_date: '2026-06-12T09:00:00', end_date: '2026-06-13T20:00:00' },
  { title: 'RDS GP', location: 'НИНО', start_date: '2026-06-13T09:00:00', end_date: '2026-06-14T20:00:00' },
  { title: 'RDS FEST', location: 'MRW', start_date: '2026-06-20T09:00:00', end_date: '2026-06-20T22:00:00' },
  { title: '3 этап САТЮКАП', location: 'ЦТСВ', start_date: '2026-06-26T09:00:00', end_date: '2026-06-27T20:00:00' },
  // Июль
  { title: 'RDS GP', location: 'ADM', start_date: '2026-07-11T09:00:00', end_date: '2026-07-12T20:00:00' },
  { title: 'RDS Open FEST', location: 'IGORA, СПБ', start_date: '2026-07-18T09:00:00', end_date: '2026-07-19T20:00:00' },
  { title: '4 этап САТЮКАП', location: 'ЦТСВ', start_date: '2026-07-24T09:00:00', end_date: '2026-07-25T20:00:00' },
  // Август
  { title: 'RDS GP', location: 'Красноярск', start_date: '2026-08-01T09:00:00', end_date: '2026-08-02T20:00:00' },
  { title: '3й этап АДМ дрифт контест', location: 'Мячково', start_date: '2026-08-07T09:00:00', end_date: '2026-08-08T20:00:00' },
  { title: 'RDS Open', location: 'TBD', start_date: '2026-08-15T09:00:00', end_date: '2026-08-16T20:00:00' },
  { title: '5 этап САТЮКАП', location: 'Atron International Circuit, Рязань', start_date: '2026-08-22T09:00:00', end_date: '2026-08-23T20:00:00' },
  { title: 'RDS FEST', location: 'IGORA, СПБ', start_date: '2026-08-22T09:00:00', end_date: '2026-08-23T20:00:00' },
  { title: 'RDS GP', location: 'MRW', start_date: '2026-08-29T09:00:00', end_date: '2026-08-30T20:00:00' },
  // Сентябрь
  { title: 'ДРИФТЭКСПО', location: 'МРВ', start_date: '2026-09-12T09:00:00', end_date: '2026-09-13T20:00:00' },
  { title: 'RDS Open', location: 'ADM, Мячково', start_date: '2026-09-12T09:00:00', end_date: '2026-09-13T20:00:00' },
  { title: '6 этап САТЮКАП', location: 'ЦТСВ', start_date: '2026-09-18T09:00:00', end_date: '2026-09-19T20:00:00' },
  { title: '4й этап АДМ дрифт контест', location: 'Мячково', start_date: '2026-09-25T09:00:00', end_date: '2026-09-26T20:00:00' },
  { title: 'СУПЕРКУБОК RDS', location: 'Ростов', start_date: '2026-09-26T09:00:00', end_date: '2026-09-27T20:00:00' },
];

export function seedDatabase() {
  const db = getDb();
  const count = db.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };

  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO events (title, description, location, start_date, end_date)
      VALUES (@title, @description, @location, @start_date, @end_date)
    `);

    const insertMany = db.transaction((evts: typeof events) => {
      for (const evt of evts) {
        insert.run({
          title: evt.title,
          description: null,
          location: evt.location,
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
