'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Plus, Pencil, Trash2, X, Save, MapPin, Calendar } from 'lucide-react';
import { SERIES_CONFIG } from '@/types';
import type { Event, EventSeries } from '@/types';

interface EventFormData {
  title: string;
  description: string;
  location: string;
  city: string;
  address: string;
  lat: string;
  lng: string;
  series: EventSeries;
  start_date: string;
  end_date: string;
  url: string;
}

const emptyForm: EventFormData = {
  title: '',
  description: '',
  location: '',
  city: '',
  address: '',
  lat: '',
  lng: '',
  series: 'other',
  start_date: '',
  end_date: '',
  url: '',
};

export function AdminEventsClient({ initialEvents }: { initialEvents: Event[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<EventFormData>(emptyForm);
  const [loading, setLoading] = useState(false);

  function startEdit(event: Event) {
    setEditingId(event.id);
    setCreating(false);
    setForm({
      title: event.title,
      description: event.description || '',
      location: event.location || '',
      city: event.city || '',
      address: event.address || '',
      lat: event.lat?.toString() || '',
      lng: event.lng?.toString() || '',
      series: event.series || 'other',
      start_date: event.start_date.slice(0, 16),
      end_date: event.end_date.slice(0, 16),
      url: event.url || '',
    });
  }

  function startCreate() {
    setCreating(true);
    setEditingId(null);
    setForm(emptyForm);
  }

  function cancel() {
    setCreating(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function saveEvent() {
    setLoading(true);
    const payload = {
      ...form,
      lat: form.lat ? parseFloat(form.lat) : null,
      lng: form.lng ? parseFloat(form.lng) : null,
    };
    try {
      if (creating) {
        const res = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create');
      } else if (editingId) {
        const res = await fetch(`/api/events/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update');
      }
      cancel();
      router.refresh();
      const res = await fetch('/api/events?all=true');
      const data = await res.json();
      setEvents(data);
    } catch {
      alert('Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  }

  async function deleteEvent(id: number) {
    if (!confirm('Удалить мероприятие?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setEvents(events.filter((e) => e.id !== id));
    } catch {
      alert('Ошибка удаления');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={startCreate} className="gap-1.5" disabled={creating}>
          <Plus className="h-4 w-4" />
          Добавить
        </Button>
      </div>

      {(creating || editingId) && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <h3 className="font-semibold">{creating ? 'Новое мероприятие' : 'Редактирование'}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Название *</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Название" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Серия</label>
              <select
                value={form.series}
                onChange={(e) => setForm({ ...form, series: e.target.value as EventSeries })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {Object.entries(SERIES_CONFIG).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Трасса</label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Название трассы/площадки" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Город</label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Москва" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Адрес</label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Полный адрес" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Широта</label>
              <Input value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} placeholder="55.7558" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Долгота</label>
              <Input value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} placeholder="37.6173" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Начало *</label>
              <Input type="datetime-local" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Окончание *</label>
              <Input type="datetime-local" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ссылка</label>
              <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Описание</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Описание" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={saveEvent} disabled={loading || !form.title || !form.start_date || !form.end_date} className="gap-1.5">
              <Save className="h-4 w-4" />
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Button>
            <Button variant="outline" onClick={cancel}>
              <X className="h-4 w-4 mr-1.5" />
              Отмена
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 p-3 text-xs font-medium text-muted-foreground border-b bg-muted/50">
          <span>Серия</span>
          <span>Мероприятие</span>
          <span>Трасса</span>
          <span>Город</span>
          <span>Даты</span>
          <span></span>
        </div>
        {events.map((event) => {
          const cfg = SERIES_CONFIG[event.series] || SERIES_CONFIG.other;
          return (
            <div
              key={event.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 p-3 text-sm items-center border-b last:border-b-0 hover:bg-accent/50"
            >
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="font-medium truncate">{event.title}</span>
              <span className="text-muted-foreground text-xs truncate">
                {event.location || '—'}
              </span>
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3" />
                {event.city || '—'}
              </span>
              <span className="text-muted-foreground flex items-center gap-1 whitespace-nowrap text-xs">
                <Calendar className="h-3 w-3" />
                {format(parseISO(event.start_date), 'd MMM', { locale: ru })}
                {' - '}
                {format(parseISO(event.end_date), 'd MMM', { locale: ru })}
              </span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => startEdit(event)} className="h-8 w-8">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteEvent(event.id)} className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
        {events.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">Нет мероприятий</div>
        )}
      </div>
    </div>
  );
}
