export interface Event {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
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
  start_date: string;
  end_date: string;
  url: string | null;
  submitter_name: string;
  submitter_email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
