import { site } from './site'

// Resume page content. Education comes from site.ts; skills and projects are
// pulled automatically from skills.ts and projects.ts (confirmed skills, and
// projects that are in progress or completed).
//
// Everything else is below. Lines in [square brackets] are placeholders that
// are hidden on the public site. Do not add anything that is not true.

export interface ResumeEntry {
  title: string          // role or position
  organization?: string
  dates?: string
  bullets?: string[]
}

export const resume = {
  summary: '[Add a 2 to 3 sentence professional summary. Only include things that are true.]',

  education: {
    school: site.school,
    degree: site.degree,
    dates: `Expected graduation: ${site.graduationYear}`,
    details: ['[Optional: add GPA, honors, or relevant coursework]'],
  },

  // Internships, jobs, research. Leave empty if you have none yet; the section
  // then stays hidden on the public site.
  experience: [] as ResumeEntry[],
  // Example of an entry:
  // { title: 'Role', organization: 'Organization', dates: 'Month Year to Month Year',
  //   bullets: ['What you did, in one line'] },

  // Student engineering teams, clubs, and other involvement. Leave empty if none.
  teams: [] as ResumeEntry[],
}
