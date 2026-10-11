import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useMemo } from 'react'
import type { Equation } from '../data/types'

/** Renders one equation with KaTeX. The LaTeX text comes from your project data. */
export function EquationBlock({ equation }: { equation: Equation }) {
  const html = useMemo(
    () => katex.renderToString(equation.latex, { displayMode: true, throwOnError: false }),
    [equation.latex],
  )
  return (
    <figure className="rounded-sm border border-line bg-surface p-4">
      <figcaption className="font-mono text-xs uppercase tracking-wider text-muted">
        {equation.label}
      </figcaption>
      {/* overflow-x-auto keeps long equations from breaking the page on phones */}
      <div className="mt-2 overflow-x-auto py-1" dangerouslySetInnerHTML={{ __html: html }} />
      {equation.note && <p className="mt-2 text-sm text-muted">{equation.note}</p>}
    </figure>
  )
}
