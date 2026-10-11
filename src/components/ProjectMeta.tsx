import type { ReactNode } from 'react'
import type { Project } from '../data/types'
import { getCategory } from '../utils/categories'
import { isDev, isPlaceholder } from '../utils/placeholders'
import { StatusBadge } from './StatusBadge'

/** One label/value row. Missing values show a tag in development, nothing in production. */
function Row({ label, value, missing }: { label: string; value?: ReactNode; missing: string }) {
  const empty = value === undefined || value === null || value === ''
  if (empty && !isDev) return null
  return (
    <div className="border-t border-line py-3 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="font-mono text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 text-sm sm:mt-0">{empty ? <span className="placeholder-chip">{missing}</span> : value}</dd>
    </div>
  )
}

export function ProjectMeta({ project }: { project: Project }) {
  const category = getCategory(project.category)
  const team =
    project.teamType === 'team' ? 'Team project' : project.teamType === 'individual' ? 'Individual project' : undefined

  return (
    <dl>
      <Row label="Status" value={<StatusBadge status={project.status} />} missing="[Add status]" />
      <Row label="Discipline" value={category.label} missing="[Add discipline]" />
      <Row label="Duration" value={project.duration} missing="[Add duration]" />
      <Row label="Project type" value={team} missing="[Individual or team?]" />
      <Row
        label="My responsibilities"
        value={isPlaceholder(project.role) ? undefined : project.role}
        missing="[Add your specific responsibilities]"
      />
      <Row
        label="Tools & software"
        value={
          project.tools.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <li key={t} className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          ) : undefined
        }
        missing="[Add tools you actually used]"
      />
    </dl>
  )
}
