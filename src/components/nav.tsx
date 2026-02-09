'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Calendar, List, PlusCircle, CalendarPlus, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

const links = [
  { href: '/', label: 'События', icon: List },
  { href: '/calendar', label: 'Календарь', icon: Calendar },
  { href: '/submit', label: 'Заявить мероприятие', icon: PlusCircle },
];

function SubscribeButton() {
  const handleSubscribe = () => {
    const baseUrl = window.location.origin;
    const webcalUrl = baseUrl.replace(/^https?:\/\//, 'webcal://') + '/feed';
    window.location.href = webcalUrl;
  };

  return (
    <Button variant="outline" size="sm" onClick={handleSubscribe} className="gap-1.5">
      <CalendarPlus className="h-4 w-4" />
      <span className="hidden sm:inline">Подписаться</span>
    </Button>
  );
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-lg">
          <Flame className="h-5 w-5 text-primary" />
          <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Drift Calendar
          </span>
        </Link>
        <nav className="flex items-center space-x-1 text-sm">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-2 transition-colors hover:bg-accent',
                pathname === href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SubscribeButton />
        </div>
      </div>
    </header>
  );
}
