import { CheckCircle2, CircleDashed, Loader } from 'lucide-react'
import type { ProjectStatus } from '../data/types'
import { statusLabels } from '../utils/categories'

const styles: Record<ProjectStatus, { cls: string; Icon: typeof Loader }> = {
  completed: { cls: 'border-emerald-400/50 text-emerald-300', Icon: CheckCircle2 },
  'in-progress': { cls: 'border-accent/60 text-accent', Icon: Loader },
  planned: { cls: 'border-safety/60 text-safety', Icon: CircleDashed },
}

/** Status is always shown as text plus an icon, never color alone. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { cls, Icon } = styles[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${cls}`}
    >
      <Icon size={12} aria-hidden="true" />
      {statusLabels[status]}
    </span>
  )
}
