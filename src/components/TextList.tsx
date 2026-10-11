import { isDev, isPlaceholder } from '../utils/placeholders'

/**
 * A bulleted list of short text items. Items still written as "[placeholders]"
 * show as orange tags in development and are hidden on the public site.
 */
export function TextList({ items }: { items?: string[] }) {
  const shown = (items ?? []).filter((item) => isDev || !isPlaceholder(item))
  if (shown.length === 0) return null
  return (
    <ul className="space-y-2.5">
      {shown.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-ink/90">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
          {isPlaceholder(item) ? <span className="placeholder-chip">{item}</span> : <span>{item}</span>}
        </li>
      ))}
    </ul>
  )
}
