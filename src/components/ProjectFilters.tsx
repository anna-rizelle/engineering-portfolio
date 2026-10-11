import { Search, X } from 'lucide-react'
import type { CategoryId } from '../data/types'
import { categories } from '../utils/categories'

export type SortKey = 'default' | 'status' | 'title'

interface Props {
  category: CategoryId | 'all'
  onCategory: (c: CategoryId | 'all') => void
  query: string
  onQuery: (q: string) => void
  sort: SortKey
  onSort: (s: SortKey) => void
  /** Number of projects per category (plus the key "all"). */
  counts: Record<string, number>
}

export function ProjectFilters({ category, onCategory, query, onQuery, sort, onSort, counts }: Props) {
  const options: { id: CategoryId | 'all'; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ]

  return (
    <div className="space-y-5">
      {/* Category filter buttons */}
      <div role="group" aria-label="Filter projects by discipline" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = category === o.id
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onCategory(o.id)}
              className={`rounded-sm border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-line text-muted hover:border-muted hover:text-ink'
              }`}
            >
              {o.label}
              <span className="ml-2 font-mono text-xs opacity-70">{counts[o.id] ?? 0}</span>
            </button>
          )
        })}
      </div>

      {/* Search and sort */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="project-search"
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search by title, tool, or topic"
            className="w-full rounded-sm border border-line bg-surface py-2.5 pl-9 pr-9 text-sm placeholder:text-muted focus:border-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted hover:text-ink"
            >
              <X size={15} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="project-sort" className="font-mono text-xs uppercase tracking-wider text-muted">
            Sort
          </label>
          <select
            id="project-sort"
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="rounded-sm border border-line bg-surface px-3 py-2.5 text-sm focus:border-accent"
          >
            <option value="default">Featured order</option>
            <option value="status">Status</option>
            <option value="title">Title (A to Z)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
