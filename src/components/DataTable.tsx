import { isPlaceholder } from '../utils/placeholders'

interface Props {
  headers: string[]
  rows: string[][]
  caption?: string
}

/** A table that scrolls sideways inside its own box on small screens. */
export function DataTable({ headers, rows, caption }: Props) {
  return (
    <div className="overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-surface2 font-mono text-xs uppercase tracking-wider text-muted">
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t border-line">
              {row.map((cell, c) => (
                <td key={c} className="px-4 py-2.5 align-top">
                  {isPlaceholder(cell) ? <span className="placeholder-chip">{cell}</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
