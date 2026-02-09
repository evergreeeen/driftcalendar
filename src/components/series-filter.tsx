'use client';

import { cn } from '@/lib/utils';
import { SERIES_CONFIG, type EventSeries } from '@/types';

const ALL_SERIES = Object.keys(SERIES_CONFIG) as EventSeries[];

interface SeriesFilterProps {
  selected: EventSeries[];
  onChange: (series: EventSeries[]) => void;
}

export function SeriesFilter({ selected, onChange }: SeriesFilterProps) {
  const allSelected = selected.length === 0;

  function toggle(series: EventSeries) {
    if (selected.includes(series)) {
      onChange(selected.filter((s) => s !== series));
    } else {
      onChange([...selected, series]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange([])}
        className={cn(
          'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
          allSelected
            ? 'border-primary/50 bg-primary/10 text-primary'
            : 'border-border text-muted-foreground hover:bg-accent'
        )}
      >
        Все
      </button>
      {ALL_SERIES.map((series) => {
        const config = SERIES_CONFIG[series];
        const isActive = selected.includes(series);
        return (
          <button
            key={series}
            onClick={() => toggle(series)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              isActive ? config.color : 'border-border text-muted-foreground hover:bg-accent'
            )}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
