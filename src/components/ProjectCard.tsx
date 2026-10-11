import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/types'
import { getCategory } from '../utils/categories'
import { isDev } from '../utils/placeholders'
import { ProjectThumb } from './ProjectThumb'
import { StatusBadge } from './StatusBadge'

export function ProjectCard({ project }: { project: Project }) {
  const category = getCategory(project.category)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-accent/70"
    >
      <ProjectThumb project={project} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {category.label}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="text-lg font-semibold leading-snug group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.shortDescription}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.tools.length > 0 ? (
            project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted"
              >
                {tool}
              </span>
            ))
          ) : (
            isDev && <span className="placeholder-chip">[Add tools used]</span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line pt-3 text-sm text-accent">
          <span className="inline-flex items-center gap-1">
            View technical breakdown
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
          {isDev && project.isExample && (
            <span className="placeholder-chip">Example entry</span>
          )}
        </div>
      </div>
    </Link>
  )
}
