export type EventSeries = 'rds_gp' | 'rds_open' | 'rds_fest' | 'satyukap' | 'adm' | 'driftexpo' | 'supercup' | 'other';

export interface Event {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
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
  rds_gp: { label: 'RDS GP', color: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-500' },
  rds_open: { label: 'RDS Open', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', dot: 'bg-orange-500' },
  rds_fest: { label: 'RDS FEST', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30', dot: 'bg-pink-500' },
  satyukap: { label: 'САТЮКАП', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-500' },
  adm: { label: 'АДМ', color: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-500' },
  driftexpo: { label: 'ДРИФТЭКСПО', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', dot: 'bg-purple-500' },
  supercup: { label: 'СУПЕРКУБОК', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-500' },
  other: { label: 'Другое', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30', dot: 'bg-zinc-500' },
};
