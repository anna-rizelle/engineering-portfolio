import { Image as ImageIcon } from 'lucide-react'
import type { Project } from '../data/types'
import { asset } from '../utils/assets'
import { getCategory } from '../utils/categories'
import { isDev } from '../utils/placeholders'

/**
 * Project thumbnail. If the project has no image yet, shows a neutral grid
 * tile. In development the tile is labeled so you know to replace it.
 */
export function ProjectThumb({ project }: { project: Project }) {
  const { icon: CategoryIcon } = getCategory(project.category)

  if (project.thumbnail) {
    return (
      <img
        src={asset(project.thumbnail)}
        alt={project.thumbnailAlt ?? `${project.title} thumbnail`}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover"
      />
    )
  }

  return (
    <div
      className="relative flex aspect-[16/9] w-full items-center justify-center bg-surface2"
      style={{
        backgroundImage:
          'linear-gradient(rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.10) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      role="img"
      aria-label={`Placeholder image for ${project.title}`}
    >
      <CategoryIcon size={36} className="text-line" aria-hidden="true" />
      {isDev && (
        <span className="placeholder-chip absolute bottom-2 left-2 flex items-center gap-1">
          <ImageIcon size={11} aria-hidden="true" /> Thumbnail placeholder
        </span>
      )}
    </div>
  )
}
