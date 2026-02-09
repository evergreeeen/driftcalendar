'use client';

import { cn } from '@/lib/utils';
import { SERIES_CONFIG, type EventSeries } from '@/types';
import { MapPin, Filter, Flag, Globe } from 'lucide-react';

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
  const allCountriesSelected = filterCountries.length === 0;
  const allCitiesSelected = filterCities.length === 0;
  const allTracksSelected = filterTracks.length === 0;

  function toggleSeries(series: EventSeries) {
    if (filterSeries.includes(series)) {
      onSeriesChange(filterSeries.filter((s) => s !== series));
    } else {
      onSeriesChange([...filterSeries, series]);
    }
  }

  function toggleCountry(country: string) {
    if (filterCountries.includes(country)) {
      onCountriesChange(filterCountries.filter((c) => c !== country));
    } else {
      onCountriesChange([...filterCountries, country]);
    }
  }

  function toggleCity(city: string) {
    if (filterCities.includes(city)) {
      onCitiesChange(filterCities.filter((c) => c !== city));
    } else {
      onCitiesChange([...filterCities, city]);
    }
  }

  function toggleTrack(track: string) {
    if (filterTracks.includes(track)) {
      onTracksChange(filterTracks.filter((t) => t !== track));
    } else {
      onTracksChange([...filterTracks, track]);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Фильтры</h3>

      {/* Series filter */}
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

      {/* Country filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Globe className="h-3 w-3" />
          <span>Страна</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onCountriesChange([])}
            className={cn(
              'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
              allCountriesSelected
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-accent'
            )}
          >
            Все
          </button>
          {countries.map((country) => {
            const isActive = filterCountries.includes(country);
            return (
              <button
                key={country}
                onClick={() => toggleCountry(country)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                  isActive
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-accent'
                )}
              >
                {country}
              </button>
            );
          })}
        </div>
      </div>

      {/* City filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
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

      {/* Track filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Flag className="h-3 w-3" />
          <span>Трасса</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onTracksChange([])}
            className={cn(
              'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
              allTracksSelected
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-accent'
            )}
          >
            Все
          </button>
          {tracks.map((track) => {
            const isActive = filterTracks.includes(track);
            return (
              <button
                key={track}
                onClick={() => toggleTrack(track)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                  isActive
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-accent'
                )}
              >
                {track}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
