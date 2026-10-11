import type { ReactNode } from 'react'
import { isDev, isPlaceholder } from '../utils/placeholders'

interface Props {
  href?: string | null
  children: ReactNode
  className?: string
  /** Text for the orange development tag when the link is not configured yet. */
  placeholderLabel?: string
  ariaLabel?: string
}

/**
 * A link that opens in a new tab. If the address is missing or still a
 * "[placeholder]", nothing is shown on the public site (no dead links), and an
 * orange tag appears in development so you remember to fill it in.
 * Email addresses (mailto:) open in the same tab.
 */
export function ExternalLink({ href, children, className, placeholderLabel, ariaLabel }: Props) {
  if (isPlaceholder(href)) {
    if (!isDev) return null
    return (
      <span className="placeholder-chip" title="Link not configured: edit src/data/site.ts">
        {placeholderLabel ?? '[Add link]'}
      </span>
    )
  }
  const isMail = href!.startsWith('mailto:')
  return (
    <a
      href={href!}
      className={className}
      aria-label={ariaLabel}
      {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}
