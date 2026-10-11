import { BadgeCheck, BookOpen, Repeat, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type SkillStatus = 'learning' | 'practicing' | 'applied' | 'demonstrated'

export const skillStatusInfo: Record<
  SkillStatus,
  { label: string; meaning: string; icon: LucideIcon }
> = {
  learning: { label: 'Learning', meaning: 'Studying the topic; no project work yet.', icon: BookOpen },
  practicing: { label: 'Practicing', meaning: 'Working through exercises and small problems.', icon: Repeat },
  applied: { label: 'Applied in a project', meaning: 'Used in a project that is planned, in progress, or not yet finished.', icon: Wrench },
  demonstrated: { label: 'Demonstrated through a completed project', meaning: 'Used in a completed project with documented results.', icon: BadgeCheck },
}
