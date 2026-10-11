// The shape of a project. You never need to edit this file to add a project;
// it just describes which fields exist. Add projects in projects.ts.
//
// Every field marked with "?" is optional. If you leave it out, that section
// simply does not appear on the project page.

export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

export type CategoryId =
  | 'aero-cfd'
  | 'mech-design'
  | 'aerospace-rocketry'
  | 'autonomous'
  | 'software-tools'

/** Where a result came from. The site labels each result with this. */
export type ResultKind = 'analytical' | 'simulation' | 'experimental'

export interface ProjectImage {
  src: string      // file inside public/images, e.g. 'images/airfoil-mesh.png'
  alt: string      // short description for screen readers
  caption: string  // what the image shows and why it matters
  placeholder?: boolean // true = stand-in image; shown in development only
}

export interface Equation {
  label: string    // e.g. 'Reynolds number'
  latex: string    // LaTeX source, e.g. 'Re = \\frac{\\rho V c}{\\mu}'
  note?: string    // optional plain-English explanation
}

export interface MethodStep {
  title: string
  description: string
}

export interface ResultItem {
  title: string
  kind: ResultKind
  description: string
  significance?: string                         // why this result matters
  table?: { headers: string[]; rows: string[][] }
  image?: ProjectImage
  placeholder?: boolean   // true = example entry; shown in development only
}

export interface ValidationItem {
  method: string                     // e.g. 'Hand calculation'
  status: 'performed' | 'planned'    // only use 'performed' if you really did it
  notes?: string
}

export interface DesignDecision {
  decision: string     // what you decided
  rationale: string    // why, including the tradeoffs you considered
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  slug: string                       // used in the URL: /projects/<slug>
  title: string
  shortDescription: string           // one technical sentence
  category: CategoryId
  status: ProjectStatus
  tools: string[]                    // only tools you have actually used
  featured?: boolean                 // show on the home page
  isExample?: boolean                // marks a starter entry (dev-only tag)

  thumbnail?: string                 // e.g. 'images/my-project-thumb.png'
  thumbnailAlt?: string

  // Overview
  duration?: string
  teamType?: 'individual' | 'team'
  role?: string                      // your specific responsibilities

  // Technical sections (all optional)
  problemStatement?: string
  objectives?: string[]
  constraints?: string[]
  theory?: { intro?: string; equations?: Equation[]; assumptions?: string[] }
  methodology?: MethodStep[]
  images?: ProjectImage[]
  results?: ResultItem[]
  validation?: ValidationItem[]
  implementationNotes?: string       // how the tools were actually used
  challenges?: string[]
  designDecisions?: DesignDecision[]
  lessons?: string[]
  nextSteps?: string[]
  links?: ProjectLink[]              // url starting with "/" links to a page on this site
}
