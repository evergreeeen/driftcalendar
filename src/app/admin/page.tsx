import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import getDb from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import type { Event } from '@/types';
import { AdminEventsClient } from './events-client';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { LogoutButton } from '@/components/logout-button';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const isAuth = await verifySession();
  if (!isAuth) redirect('/admin/login');

  seedDatabase();
  const db = getDb();
  const events = db.prepare('SELECT * FROM events ORDER BY start_date ASC').all() as Event[];
  const pendingCount = (db.prepare("SELECT COUNT(*) as count FROM submissions WHERE status = 'pending'").get() as { count: number }).count;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Админ-панель</h1>
          <p className="text-muted-foreground">Управление мероприятиями</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/submissions"
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm hover:bg-accent"
          >
            <FileText className="h-4 w-4" />
            Заявки
            {pendingCount > 0 && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                {pendingCount}
              </span>
            )}
          </Link>
          <LogoutButton />
        </div>
      </div>

      <AdminEventsClient initialEvents={events} />
    </div>
  );
}
