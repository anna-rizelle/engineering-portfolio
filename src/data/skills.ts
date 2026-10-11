import type { SkillStatus } from '../utils/skillStatus'

// Skills are grouped into categories. Each skill has an EVIDENCE-BASED status:
//
//   'learning'      studying it, no project work yet
//   'practicing'    working through exercises or tutorials
//   'applied'       used in a project (link the project with projectSlug)
//   'demonstrated'  used in a COMPLETED project (link the project with projectSlug)
//
// Every skill below starts as `confirmed: false`. Unconfirmed skills show an
// orange tag in development and are HIDDEN on the public site. For each skill:
//   1. set the status that is actually true today,
//   2. set confirmed: true,
//   3. for 'applied' or 'demonstrated', add projectSlug: '<slug from projects.ts>'.
// Delete any skill you don't want to list.

export interface Skill {
  name: string
  status: SkillStatus
  confirmed: boolean
  projectSlug?: string
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

const s = (name: string): Skill => ({ name, status: 'learning', confirmed: false })

export const skillCategories: SkillCategory[] = [
  {
    id: 'cad',
    title: 'CAD and mechanical design',
    skills: [s('3D modeling'), s('Parametric CAD'), s('Technical drawings'), s('Design for manufacturability')],
  },
  {
    id: 'aero-sim',
    title: 'Aerodynamics and simulation',
    skills: [
      s('Fluid mechanics'),
      s('Aerodynamics fundamentals'),
      s('CFD setup and interpretation'),
      s('Meshing and boundary conditions'),
      s('Simulation verification'),
    ],
  },
  {
    id: 'programming',
    title: 'Programming and computational tools',
    skills: [
      s('Python'),
      s('Numerical calculations'),
      s('Data processing'),
      s('Plotting and visualization'),
      s('Git and GitHub'),
    ],
  },
  {
    id: 'structures',
    title: 'Structures and aerospace',
    skills: [
      s('Statics and mechanics of materials'),
      s('Structural analysis'),
      s('Composite materials'),
      s('Propulsion and thermodynamics'),
    ],
  },
]
