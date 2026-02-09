'use client';

import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <button
      className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm hover:bg-accent"
      onClick={async () => {
        await fetch('/api/auth', { method: 'DELETE' });
        window.location.href = '/admin/login';
      }}
    >
      <LogOut className="h-4 w-4" />
      Выйти
    </button>
  );
}
