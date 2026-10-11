import { isDev, isPlaceholder } from '../utils/placeholders'

interface Props {
  value?: string | null
  /** Text shown on the public site if the value is still a placeholder. */
  fallback?: string
}

/**
 * Shows a piece of text from your data files.
 * - Real value: shows it.
 * - Placeholder in development: shows an orange tag so you can spot it.
 * - Placeholder on the public site: shows the fallback (or nothing).
 */
export function Editable({ value, fallback }: Props) {
  if (!isPlaceholder(value)) return <>{value}</>
  if (isDev) {
    return (
      <span className="placeholder-chip" title="Placeholder: edit it in src/data">
        {value || '[Add content]'}
      </span>
    )
  }
  return fallback ? <>{fallback}</> : null
}
