'use client';

import { useState } from 'react';
import type { DogGender } from '@/types';

export const breeds = ['Yorkie', 'Maltipoo', 'Poodle', 'Shih Tzu', 'Dachshund'] as const;
export type BreedFilter = (typeof breeds)[number];

export interface DogFilters {
  breed: BreedFilter | 'all';
  gender: DogGender | 'all';
}

export const defaultFilters: DogFilters = {
  breed: 'all',
  gender: 'all',
};

interface Props {
  onApply: (filters: DogFilters) => void;
  resultCount: number;
}

/** Filter controls. Sticky sidebar on desktop, collapsible panel on mobile. */
export default function FilterSidebar({ onApply, resultCount }: Props) {
  const [draft, setDraft] = useState<DogFilters>(defaultFilters);
  const [open, setOpen] = useState(false);

  const set = <K extends keyof DogFilters>(key: K, value: DogFilters[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const apply = () => {
    onApply(draft);
    setOpen(false);
  };

  const reset = () => {
    setDraft(defaultFilters);
    onApply(defaultFilters);
  };

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mobile toggle */}
      <button type="button" onClick={() => setOpen((v) => !v)} className="btn-ghost mb-4 w-full justify-between lg:hidden" aria-expanded={open}>
        <span>Filters</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      <div className={`${open ? 'block' : 'hidden'} card p-6 lg:block`}>
        <h2 className="text-lg font-extrabold text-forest-800">Filter puppies</h2>
        <p className="mt-1 text-sm text-muted">{resultCount} puppies match your search</p>

        <div className="mt-5 space-y-5">
          <div>
            <label className="label" htmlFor="f-breed">
              Breed
            </label>
            <select id="f-breed" className="input" value={draft.breed} onChange={(e) => set('breed', e.target.value as DogFilters['breed'])}>
              <option value="all">Any breed</option>
              {breeds.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="f-gender">
              Gender
            </label>
            <select id="f-gender" className="input" value={draft.gender} onChange={(e) => set('gender', e.target.value as DogFilters['gender'])}>
              <option value="all">Any gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button type="button" onClick={apply} className="btn-primary w-full">
              Apply Filters
            </button>
            <button type="button" onClick={reset} className="btn-ghost w-full">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
