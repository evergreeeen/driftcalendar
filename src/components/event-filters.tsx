'use client';

import { cn } from '@/lib/utils';
import { SERIES_CONFIG, type EventSeries } from '@/types';
import { MapPin, Filter, Flag, Globe } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';

const ALL_SERIES = Object.keys(SERIES_CONFIG) as EventSeries[];

interface EventFiltersProps {
  filterSeries: EventSeries[];
  onSeriesChange: (series: EventSeries[]) => void;
  filterCountries: string[];
  onCountriesChange: (countries: string[]) => void;
  countries: string[];
  filterCities: string[];
  onCitiesChange: (cities: string[]) => void;
  cities: string[];
  filterTracks: string[];
  onTracksChange: (tracks: string[]) => void;
  tracks: string[];
}

export function EventFilters({
  filterSeries,
  onSeriesChange,
  filterCountries,
  onCountriesChange,
  countries,
  filterCities,
  onCitiesChange,
  cities,
  filterTracks,
  onTracksChange,
  tracks,
}: EventFiltersProps) {
  const allSeriesSelected = filterSeries.length === 0;

  function toggleSeries(series: EventSeries) {
    if (filterSeries.includes(series)) {
      onSeriesChange(filterSeries.filter((s) => s !== series));
    } else {
      onSeriesChange([...filterSeries, series]);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Фильтры</h3>

      {/* Series filter — chips */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
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

      {/* Country multiselect */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Globe className="h-3 w-3" />
          <span>Страна</span>
        </div>
        <MultiSelect
          options={countries}
          selected={filterCountries}
          onChange={onCountriesChange}
          placeholder="Все страны"
        />
      </div>

      {/* City multiselect */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <MapPin className="h-3 w-3" />
          <span>Город</span>
        </div>
        <MultiSelect
          options={cities}
          selected={filterCities}
          onChange={onCitiesChange}
          placeholder="Все города"
        />
      </div>

      {/* Track multiselect */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Flag className="h-3 w-3" />
          <span>Трасса</span>
        </div>
        <MultiSelect
          options={tracks}
          selected={filterTracks}
          onChange={onTracksChange}
          placeholder="Все трассы"
        />
      </div>
    </div>
  );
}
