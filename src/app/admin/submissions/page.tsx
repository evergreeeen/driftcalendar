import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import getDb from '@/lib/db';
import type { Submission } from '@/types';
import { SubmissionsClient } from './submissions-client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SubmissionsPage() {
  const isAuth = await verifySession();
  if (!isAuth) redirect('/admin/login');

  const db = getDb();
  const submissions = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all() as Submission[];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-sm hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Заявки</h1>
          <p className="text-muted-foreground">Рассмотрение заявок на добавление мероприятий</p>
        </div>
      </div>

      <SubmissionsClient initialSubmissions={submissions} />
    </div>
  );
}
