import type { ReactNode } from 'react'

interface Props {
  label: string        // small mono label, e.g. "01 / Projects"
  title: string
  children?: ReactNode // optional intro text
}

export function SectionHeading({ label, title, children }: Props) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="label-mono">{label}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {children && <p className="mt-3 text-muted">{children}</p>}
    </div>
  )
}
