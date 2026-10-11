import { Bot, Rocket, Ruler, Terminal, Wind } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CategoryId, ProjectStatus } from '../data/types'

export const categories: { id: CategoryId; label: string; icon: LucideIcon }[] = [
  { id: 'aero-cfd', label: 'Aerodynamics & CFD', icon: Wind },
  { id: 'mech-design', label: 'Mechanical Design', icon: Ruler },
  { id: 'aerospace-rocketry', label: 'Aerospace & Rocketry', icon: Rocket },
  { id: 'autonomous', label: 'Autonomous Systems', icon: Bot },
  { id: 'software-tools', label: 'Software & Engineering Tools', icon: Terminal },
]

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!
}

export const statusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
}
