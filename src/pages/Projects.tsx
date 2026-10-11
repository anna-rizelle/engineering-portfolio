import { SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectFilters } from '../components/ProjectFilters'
import type { SortKey } from '../components/ProjectFilters'
import { projects } from '../data/projects'
import type { CategoryId } from '../data/types'
import { getCategory } from '../utils/categories'
import { usePageTitle } from '../utils/usePageTitle'

const statusOrder = { 'in-progress': 0, completed: 1, planned: 2 }

export default function Projects() {
  usePageTitle('Projects')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('default')

  // How many projects each filter button would show
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length }
    for (const p of projects) result[p.category] = (result[p.category] ?? 0) + 1
    return result
  }, [])

  const visible = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    const list = projects.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      // Every search word must appear somewhere in the project's text
      const text = [p.title, p.shortDescription, getCategory(p.category).label, p.tools.join(' ')]
        .join(' ')
        .toLowerCase()
      return words.every((w) => text.includes(w))
    })
    if (sort === 'status') list.sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
    if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [category, query, sort])

  const clearFilters = () => {
    setCategory('all')
    setQuery('')
  }

  return (
    <section className="container-page py-16">
      <p className="label-mono">Projects</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Engineering projects</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Each project has a technical breakdown covering theory, methodology, and how the work was
        checked. Status labels show what is planned, in progress, or completed.
      </p>

      <div className="mt-10">
        <ProjectFilters
          category={category}
          onCategory={setCategory}
          query={query}
          onQuery={setQuery}
          sort={sort}
          onSort={setSort}
          counts={counts}
        />
      </div>

      <p role="status" aria-live="polite" className="mt-8 font-mono text-xs uppercase tracking-wider text-muted">
        Showing {visible.length} of {projects.length} projects
      </p>

      {visible.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center border border-dashed border-line px-6 py-16 text-center">
          <SearchX size={28} className="text-muted" aria-hidden="true" />
          {projects.length === 0 ? (
            <p className="mt-4 text-muted">No projects have been added yet.</p>
          ) : (
            <>
              <p className="mt-4 text-muted">No projects match your filters.</p>
              <button type="button" onClick={clearFilters} className="btn btn-secondary mt-5">
                Clear filters
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}
