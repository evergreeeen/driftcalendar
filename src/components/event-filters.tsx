'use client';

import { cn } from '@/lib/utils';
import { SERIES_CONFIG, type EventSeries } from '@/types';
import { MapPin, Filter } from 'lucide-react';

const ALL_SERIES = Object.keys(SERIES_CONFIG) as EventSeries[];

interface EventFiltersProps {
  filterSeries: EventSeries[];
  onSeriesChange: (series: EventSeries[]) => void;
  filterCities: string[];
  onCitiesChange: (cities: string[]) => void;
  cities: string[];
}

export function EventFilters({
  filterSeries,
  onSeriesChange,
  filterCities,
  onCitiesChange,
  cities,
}: EventFiltersProps) {
  const allSeriesSelected = filterSeries.length === 0;
  const allCitiesSelected = filterCities.length === 0;

  function toggleSeries(series: EventSeries) {
    if (filterSeries.includes(series)) {
      onSeriesChange(filterSeries.filter((s) => s !== series));
    } else {
      onSeriesChange([...filterSeries, series]);
    }
  }

  function toggleCity(city: string) {
    if (filterCities.includes(city)) {
      onCitiesChange(filterCities.filter((c) => c !== city));
    } else {
      onCitiesChange([...filterCities, city]);
    }
  }

  return (
    <div className="space-y-3">
      {/* Series filter */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Filter className="h-3 w-3" />
          <span>Серия</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSeriesChange([])}
            className={cn(
              'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
              allSeriesSelected
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-accent'
            )}
          >
            Все
          </button>
          {ALL_SERIES.map((series) => {
            const config = SERIES_CONFIG[series];
            const isActive = filterSeries.includes(series);
            return (
              <button
                key={series}
                onClick={() => toggleSeries(series)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                  isActive ? config.color : 'border-border text-muted-foreground hover:bg-accent'
                )}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* City filter */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>Город</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onCitiesChange([])}
            className={cn(
              'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
              allCitiesSelected
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-accent'
            )}
          >
            Все
          </button>
          {cities.map((city) => {
            const isActive = filterCities.includes(city);
            return (
              <button
                key={city}
                onClick={() => toggleCity(city)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                  isActive
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-accent'
                )}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
