import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { skillCategories } from '../data/skills'
import type { Skill } from '../data/skills'
import { isDev } from '../utils/placeholders'
import { skillStatusInfo } from '../utils/skillStatus'
import { usePageTitle } from '../utils/usePageTitle'

function StatusPill({ status }: { status: Skill['status'] }) {
  const { label, icon: Icon } = skillStatusInfo[status]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/50 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
      <Icon size={12} aria-hidden="true" /> {label}
    </span>
  )
}

/** Development-only warnings that keep skill claims honest. */
function devWarnings(skill: Skill): string[] {
  const warnings: string[] = []
  if (!skill.confirmed) warnings.push('Unconfirmed: hidden on the public site')
  const project = projects.find((p) => p.slug === skill.projectSlug)
  const needsProject = skill.status === 'applied' || skill.status === 'demonstrated'
  if (needsProject && !project) warnings.push('[Link a project as evidence]')
  if (skill.projectSlug && !project) warnings.push('[Unknown project slug]')
  if (skill.status === 'demonstrated' && project && project.status !== 'completed')
    warnings.push('Linked project is not marked completed')
  return warnings
}

export default function Skills() {
  usePageTitle('Skills')

  // On the public site, only skills you have confirmed are shown
  const categories = skillCategories
    .map((c) => ({ ...c, skills: c.skills.filter((s) => isDev || s.confirmed) }))
    .filter((c) => c.skills.length > 0)

  return (
    <section className="container-page py-16">
      <p className="label-mono">Skills</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Technical skills and evidence</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Each skill shows what I have actually done with it, and links to the project that backs it up
        where one exists.
      </p>

      {isDev && (
        <p className="mt-6 max-w-2xl border-l-2 border-safety bg-safety/10 px-4 py-3 text-sm">
          Development note: every skill starts unconfirmed. Edit <code className="font-mono">src/data/skills.ts</code>{' '}
          to set the true status and mark each skill confirmed. Unconfirmed skills are hidden on the public site.
        </p>
      )}

      {/* How to read the statuses */}
      <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
        {Object.values(skillStatusInfo).map(({ label, meaning, icon: Icon }) => (
          <div key={label} className="bg-surface p-4">
            <dt className="flex items-center gap-2 text-sm font-medium">
              <Icon size={15} className="text-accent" aria-hidden="true" /> {label}
            </dt>
            <dd className="mt-1 text-sm text-muted">{meaning}</dd>
          </div>
        ))}
      </dl>

      {categories.length === 0 ? (
        <p className="mt-12 max-w-xl border border-dashed border-line p-6 text-muted">
          Skills are documented here as projects are completed.
        </p>
      ) : (
        <div className="mt-14 space-y-14">
          {categories.map((category) => (
            <section key={category.id} aria-labelledby={`skills-${category.id}`}>
              <h2 id={`skills-${category.id}`} className="text-xl font-semibold tracking-tight">
                {category.title}
              </h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {category.skills.map((skill) => {
                  const project = projects.find((p) => p.slug === skill.projectSlug)
                  return (
                    <li
                      key={skill.name}
                      className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        {project && (
                          <p className="mt-0.5 text-sm text-muted">
                            Evidence:{' '}
                            <Link to={`/projects/${project.slug}`} className="text-accent hover:underline">
                              {project.title}
                            </Link>
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {isDev &&
                          devWarnings(skill).map((w) => (
                            <span key={w} className="placeholder-chip">
                              {w}
                            </span>
                          ))}
                        <StatusPill status={skill.status} />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
