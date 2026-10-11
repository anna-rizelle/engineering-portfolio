import { useEffect } from 'react'

/** Sets the browser tab title for a page. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | Engineering Portfolio`
      : 'Engineering Portfolio | Aerospace & Mechanical Engineering'
  }, [title])
}
