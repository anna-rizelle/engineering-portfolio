import type { ReactNode } from 'react'
import { isDev } from '../utils/placeholders'

interface Props {
  id: string
  number: number
  title: string
  tag?: string            // small label next to the title, e.g. "Planned"
  hasContent: boolean
  missingText: string     // shown as an orange tag in development when empty
  children: ReactNode
}

/**
 * One numbered section of a project page.
 * No content: the section is hidden on the public site, and in development it
 * shows an orange tag telling you what to add.
 */
export function DetailSection({ id, number, title, tag, hasContent, missingText, children }: Props) {
  if (!hasContent && !isDev) return null
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line pt-8">
      <h2 id={`${id}-title`} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xl font-semibold tracking-tight">
        <span className="font-mono text-sm text-safety">{String(number).padStart(2, '0')}</span>
        {title}
        {tag && hasContent && (
          <span className="rounded-sm border border-safety/60 px-1.5 py-0.5 font-mono text-[11px] font-normal uppercase tracking-wider text-safety">
            {tag}
          </span>
        )}
      </h2>
      <div className="mt-5">
        {hasContent ? children : <span className="placeholder-chip">{missingText}</span>}
      </div>
    </section>
  )
}
