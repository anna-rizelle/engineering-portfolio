/**
 * "On this page" menu for project pages. Uses buttons that scroll to a section,
 * because normal #links would clash with the site's hash-based page addresses.
 */
export function SectionNav({ items }: { items: { id: string; title: string }[] }) {
  const go = (id: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }
  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-24">
        <p className="label-mono mb-3">On this page</p>
        <ul className="space-y-1 border-l border-line">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                className="-ml-px block w-full border-l border-transparent py-1 pl-4 text-left text-sm text-muted transition-colors hover:border-accent hover:text-ink"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
