'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Check, X, Trash2, MapPin, Calendar, User, Mail } from 'lucide-react';
import type { Submission } from '@/types';

const statusLabels: Record<string, { label: string; variant: 'default' | 'success' | 'destructive' | 'warning' }> = {
  pending: { label: 'Ожидает', variant: 'warning' },
  approved: { label: 'Одобрена', variant: 'success' },
  rejected: { label: 'Отклонена', variant: 'destructive' },
};

export function SubmissionsClient({ initialSubmissions }: { initialSubmissions: Submission[] }) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [loading, setLoading] = useState<number | null>(null);

  async function updateStatus(id: number, status: 'approved' | 'rejected') {
    setLoading(id);
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmissions(
        submissions.map((s) => (s.id === id ? { ...s, status } : s))
      );
      router.refresh();
    } catch {
      alert('Ошибка обработки заявки');
    } finally {
      setLoading(null);
    }
  }

  async function deleteSubmission(id: number) {
    if (!confirm('Удалить заявку?')) return;
    setLoading(id);
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      setSubmissions(submissions.filter((s) => s.id !== id));
    } catch {
      alert('Ошибка удаления');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-3">
      {submissions.map((sub) => {
        const { label, variant } = statusLabels[sub.status] || statusLabels.pending;
        const isLoading = loading === sub.id;

        return (
          <div key={sub.id} className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{sub.title}</h3>
                  <Badge variant={variant}>{label}</Badge>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(parseISO(sub.start_date), 'd MMM yyyy', { locale: ru })}
                    {' - '}
                    {format(parseISO(sub.end_date), 'd MMM yyyy', { locale: ru })}
                  </span>
                  {sub.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {sub.location}
                    </span>
                  )}
                </div>
                {sub.description && (
                  <p className="text-sm text-muted-foreground">{sub.description}</p>
                )}
                <div className="flex gap-3 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {sub.submitter_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {sub.submitter_email}
                  </span>
                </div>
              </div>
            </div>

            {sub.status === 'pending' && (
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={() => updateStatus(sub.id, 'approved')}
                  disabled={isLoading}
                  className="gap-1 bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-3.5 w-3.5" />
                  Одобрить
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => updateStatus(sub.id, 'rejected')}
                  disabled={isLoading}
                  className="gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                  Отклонить
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteSubmission(sub.id)}
                  disabled={isLoading}
                  className="gap-1 ml-auto"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        );
      })}

      {submissions.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Нет заявок
        </div>
      )}
    </div>
  );
}
