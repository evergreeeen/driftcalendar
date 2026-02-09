export type EventSeries = 'rds' | 'sdc' | 'satyukap' | 'adm' | 'driftexpo' | 'supercup' | 'royal_drift' | 'd1gp' | 'drift_masters' | 'formula_drift' | 'other';

export interface Event {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  city: string | null;
  country: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  series: EventSeries;
  start_date: string;
  end_date: string;
  url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  address: string | null;
  start_date: string;
  end_date: string;
  url: string | null;
  submitter_name: string;
  submitter_email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const SERIES_CONFIG: Record<EventSeries, { label: string; color: string; dot: string }> = {
  rds: { label: 'RDS', color: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-500' },
  sdc: { label: 'SDC', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30', dot: 'bg-teal-500' },
  satyukap: { label: 'САТЮКАП', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-500' },
  adm: { label: 'АДМ', color: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-500' },
  driftexpo: { label: 'ДРИФТЭКСПО', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', dot: 'bg-purple-500' },
  supercup: { label: 'СУПЕРКУБОК', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-500' },
  royal_drift: { label: 'Royal Drift', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', dot: 'bg-amber-500' },
  d1gp: { label: 'D1GP', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30', dot: 'bg-rose-500' },
  drift_masters: { label: 'Drift Masters', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', dot: 'bg-cyan-500' },
  formula_drift: { label: 'Formula DRIFT', color: 'bg-lime-500/20 text-lime-400 border-lime-500/30', dot: 'bg-lime-500' },
  other: { label: 'Другое', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30', dot: 'bg-zinc-500' },
};
