import { useEffect, useState } from 'react'
import { asset } from './assets'

/**
 * Checks whether a file in /public really exists, so the site never shows a
 * download button that leads nowhere. Some servers answer a missing file with
 * the home page, so an HTML reply counts as "not found".
 */
export function useFileExists(path: string): 'checking' | 'yes' | 'no' {
  const [state, setState] = useState<'checking' | 'yes' | 'no'>('checking')

  useEffect(() => {
    let cancelled = false
    fetch(asset(path), { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? ''
        if (!cancelled) setState(res.ok && !type.includes('text/html') ? 'yes' : 'no')
      })
      .catch(() => {
        if (!cancelled) setState('no')
      })
    return () => {
      cancelled = true
    }
  }, [path])

  return state
}
