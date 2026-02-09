'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle } from 'lucide-react';

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      title: data.get('title'),
      description: data.get('description'),
      location: data.get('location'),
      start_date: data.get('start_date'),
      end_date: data.get('end_date'),
      url: data.get('url'),
      submitter_name: data.get('submitter_name'),
      submitter_email: data.get('submitter_email'),
    };

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Ошибка отправки');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold">Заявка отправлена!</h1>
        <p className="text-muted-foreground">
          Ваша заявка будет рассмотрена администратором. После одобрения мероприятие появится в календаре.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Отправить ещё
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Подать заявку</h1>
        <p className="text-muted-foreground">
          Предложите мероприятие для добавления в календарь
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Название мероприятия *
          </label>
          <Input id="title" name="title" required placeholder="Например: 1 этап RDS GP" />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Место проведения
          </label>
          <Input id="location" name="location" placeholder="Например: Мячково" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="start_date" className="text-sm font-medium">
              Дата начала *
            </label>
            <Input id="start_date" name="start_date" type="datetime-local" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="end_date" className="text-sm font-medium">
              Дата окончания *
            </label>
            <Input id="end_date" name="end_date" type="datetime-local" required />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Описание
          </label>
          <Textarea id="description" name="description" placeholder="Дополнительная информация о мероприятии" />
        </div>

        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            Ссылка
          </label>
          <Input id="url" name="url" type="url" placeholder="https://..." />
        </div>

        <hr />

        <div className="space-y-2">
          <label htmlFor="submitter_name" className="text-sm font-medium">
            Ваше имя *
          </label>
          <Input id="submitter_name" name="submitter_name" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="submitter_email" className="text-sm font-medium">
            Ваш email *
          </label>
          <Input id="submitter_email" name="submitter_email" type="email" required />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full gap-1.5">
          <Send className="h-4 w-4" />
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </form>
    </div>
  );
}
