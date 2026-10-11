import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed, Cpu, FlaskConical, Sigma } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataTable } from '../components/DataTable'
import { DetailSection } from '../components/DetailSection'
import { EquationBlock } from '../components/EquationBlock'
import { ProjectMeta } from '../components/ProjectMeta'
import { SectionNav } from '../components/SectionNav'
import { StatusBadge } from '../components/StatusBadge'
import { TechnicalGallery } from '../components/TechnicalGallery'
import { TextList } from '../components/TextList'
import { projects } from '../data/projects'
import type { Project, ResultKind } from '../data/types'
import { getCategory } from '../utils/categories'
import { isDev, isPlaceholder, realItems } from '../utils/placeholders'
import { usePageTitle } from '../utils/usePageTitle'

// Every result is labeled by where it came from, so predictions, simulations,
// and physical measurements are never confused with one another.
const kindInfo: Record<ResultKind, { label: string; Icon: typeof Sigma }> = {
  analytical: { label: 'Analytical prediction', Icon: Sigma },
  simulation: { label: 'Numerical simulation', Icon: Cpu },
  experimental: { label: 'Experimental measurement', Icon: FlaskConical },
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">{children}</h3>
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  usePageTitle(project?.title ?? 'Project not found')

  if (!project) {
    return (
      <section className="container-page py-24">
        <p className="label-mono">Error 404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Project not found</h1>
        <p className="mt-4 max-w-xl text-muted">No project matches this address.</p>
        <Link to="/projects" className="btn btn-secondary mt-6">
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>
      </section>
    )
  }
  return <ProjectPage project={project} />
}

function ProjectPage({ project: p }: { project: Project }) {
  const category = getCategory(p.category)

  // ---- Work out which sections have real content ----
  const objectives = realItems(p.objectives)
  const constraints = realItems(p.constraints)
  const equations = p.theory?.equations ?? []
  const theoryIntro = isPlaceholder(p.theory?.intro) ? undefined : p.theory?.intro
  const assumptions = realItems(p.theory?.assumptions)
  const steps = p.methodology ?? []
  const implementationNotes = isPlaceholder(p.implementationNotes) ? undefined : p.implementationNotes
  const images = (p.images ?? []).filter((img) => isDev || !img.placeholder)
  const results = (p.results ?? []).filter((r) => isDev || !r.placeholder)
  const performed = (p.validation ?? []).filter((v) => v.status === 'performed')
  const planned = (p.validation ?? []).filter((v) => v.status === 'planned')
  const challenges = realItems(p.challenges)
  const decisions = p.designDecisions ?? []
  const lessons = realItems(p.lessons)
  const nextSteps = realItems(p.nextSteps)
  // A sub-list (and its small heading) shows only if it has something to display
  const show = (raw?: string[], real?: string[]) => (isDev ? !!raw?.length : (real?.length ?? 0) > 0)
  const realLinks = (p.links ?? []).filter((l) => !isPlaceholder(l.url))
  const placeholderLinks = (p.links ?? []).filter((l) => isPlaceholder(l.url))

  // ---- One entry per section: title, whether it has content, and its body ----
  const defs: {
    id: string
    title: string
    tag?: string
    hasContent: boolean
    missingText: string
    body: ReactNode
  }[] = [
    {
      id: 'overview',
      title: 'Project overview',
      hasContent: true,
      missingText: '',
      body: (
        <div className="space-y-5">
          {p.status === 'planned' && (
            <p className="border-l-2 border-safety bg-safety/10 px-4 py-3 text-sm">
              This is a planned project. Nothing on this page describes completed work.
            </p>
          )}
          {p.status === 'in-progress' && (
            <p className="border-l-2 border-accent bg-accent/10 px-4 py-3 text-sm">
              This project is in progress. Results shown here may be preliminary.
            </p>
          )}
          <ProjectMeta project={p} />
        </div>
      ),
    },
    {
      id: 'problem',
      title: 'Problem statement',
      hasContent: !isPlaceholder(p.problemStatement),
      missingText: '[Add problem statement: what problem, why it matters, what you are trying to accomplish]',
      body: <p className="max-w-3xl leading-relaxed text-ink/90">{p.problemStatement}</p>,
    },
    {
      id: 'objectives',
      title: 'Objectives and constraints',
      hasContent: objectives.length + constraints.length > 0,
      missingText: '[Add measurable objectives and constraints]',
      body: (
        <div className="grid gap-8 md:grid-cols-2">
          {show(p.objectives, objectives) && (
            <div>
              <SubHeading>Objectives</SubHeading>
              <TextList items={p.objectives} />
            </div>
          )}
          {show(p.constraints, constraints) && (
            <div>
              <SubHeading>Constraints</SubHeading>
              <TextList items={p.constraints} />
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'theory',
      title: 'Engineering theory',
      hasContent: equations.length + assumptions.length > 0 || !!theoryIntro,
      missingText: '[Add governing equations, assumptions, and relevant theory]',
      body: (
        <div className="space-y-6">
          {theoryIntro && <p className="max-w-3xl leading-relaxed text-ink/90">{theoryIntro}</p>}
          {equations.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {equations.map((eq) => (
                <EquationBlock key={eq.label} equation={eq} />
              ))}
            </div>
          )}
          {show(p.theory?.assumptions, assumptions) && (
            <div>
              <SubHeading>Assumptions</SubHeading>
              <TextList items={p.theory?.assumptions} />
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'method',
      title: 'Design and methodology',
      tag: p.status === 'planned' ? 'Planned workflow' : undefined,
      hasContent: steps.length > 0,
      missingText: '[Add methodology steps: research, geometry, calculations, simulation, iteration, testing]',
      body: (
        <ol className="space-y-5">
          {steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
              <span className="font-mono text-lg text-accent">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'tools',
      title: 'Tools and implementation',
      hasContent: p.tools.length > 0 || !!implementationNotes,
      missingText: '[Add the tools you actually used]',
      body: (
        <div className="space-y-4">
          {p.tools.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <li key={t} className="rounded-sm border border-line bg-surface px-3 py-1 font-mono text-sm">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {implementationNotes && <p className="max-w-3xl leading-relaxed text-ink/90">{implementationNotes}</p>}
        </div>
      ),
    },
    {
      id: 'visuals',
      title: 'Technical visuals',
      hasContent: images.length > 0,
      missingText: '[Add CAD, mesh, plot, or photo images with captions]',
      body: <TechnicalGallery images={p.images ?? []} />,
    },
    {
      id: 'results',
      title: 'Results and analysis',
      hasContent: results.length > 0,
      missingText: '[Insert verified results, labeled as analytical, simulation, or experimental]',
      body: (
        <div className="space-y-8">
          <p className="text-sm text-muted">
            Each result is labeled by its source: analytical prediction, numerical simulation, or
            experimental measurement.
          </p>
          {results.map((r) => {
            const { label, Icon } = kindInfo[r.kind]
            return (
              <article key={r.title} className="space-y-4 border border-line bg-surface p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-medium">
                    {isPlaceholder(r.title) ? <span className="placeholder-chip">{r.title}</span> : r.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/50 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                    <Icon size={12} aria-hidden="true" /> {label}
                  </span>
                  {r.placeholder && <span className="placeholder-chip">Example entry</span>}
                </div>
                <p className="leading-relaxed text-ink/90">
                  {isPlaceholder(r.description) ? (
                    <span className="placeholder-chip">{r.description}</span>
                  ) : (
                    r.description
                  )}
                </p>
                {r.table && <DataTable headers={r.table.headers} rows={r.table.rows} caption={r.title} />}
                {r.image && <TechnicalGallery images={[r.image]} />}
                {r.significance && (
                  <p className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-ink">Engineering significance: </span>
                    {isPlaceholder(r.significance) ? (
                      <span className="placeholder-chip">{r.significance}</span>
                    ) : (
                      r.significance
                    )}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      ),
    },
    {
      id: 'validation',
      title: 'Verification and validation',
      hasContent: performed.length + planned.length > 0,
      missingText: '[Describe how you checked the work: hand calcs, mesh study, benchmark comparison]',
      body: (
        <div className="grid gap-8 md:grid-cols-2">
          {[
            { heading: 'Performed', items: performed, Icon: CheckCircle2, cls: 'text-emerald-300' },
            { heading: 'Planned next steps', items: planned, Icon: CircleDashed, cls: 'text-safety' },
          ]
            .filter((g) => g.items.length > 0)
            .map(({ heading, items, Icon, cls }) => (
              <div key={heading}>
                <SubHeading>{heading}</SubHeading>
                <ul className="space-y-3">
                  {items.map((v) => (
                    <li key={v.method} className="flex gap-3">
                      <Icon size={18} className={`mt-0.5 shrink-0 ${cls}`} aria-hidden="true" />
                      <div>
                        <p className="font-medium">{v.method}</p>
                        {v.notes && <p className="mt-0.5 text-sm text-muted">{v.notes}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ),
    },
    {
      id: 'challenges',
      title: 'Challenges and design decisions',
      hasContent: challenges.length + decisions.length > 0,
      missingText: '[Add difficult parts, decisions, tradeoffs, and what you would improve]',
      body: (
        <div className="space-y-8">
          {show(p.challenges, challenges) && (
            <div>
              <SubHeading>Challenges</SubHeading>
              <TextList items={p.challenges} />
            </div>
          )}
          {decisions.length > 0 && (
            <div>
              <SubHeading>Design decisions</SubHeading>
              <ul className="space-y-4">
                {decisions.map((d) => (
                  <li key={d.decision} className="border border-line bg-surface p-4">
                    <p className="font-medium">{d.decision}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{d.rationale}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'lessons',
      title: 'Lessons learned and next steps',
      hasContent: lessons.length + nextSteps.length > 0,
      missingText: '[Add lessons learned and what remains to be done]',
      body: (
        <div className="grid gap-8 md:grid-cols-2">
          {show(p.lessons, lessons) && (
            <div>
              <SubHeading>Lessons learned</SubHeading>
              <TextList items={p.lessons} />
            </div>
          )}
          {show(p.nextSteps, nextSteps) && (
            <div>
              <SubHeading>Next steps</SubHeading>
              <TextList items={p.nextSteps} />
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'links',
      title: 'Project links',
      hasContent: realLinks.length > 0,
      missingText: '[Link GitHub repository, report, CAD files, or demo]',
      body: (
        <ul className="flex flex-wrap gap-3">
          {realLinks.map((l) => (
            <li key={l.url}>
              {l.url.startsWith('/') ? (
                <Link to={l.url} className="btn btn-secondary">
                  {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ) : (
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
          {isDev &&
            placeholderLinks.map((l) => (
              <li key={l.label}>
                <span className="placeholder-chip">{l.url}</span>
              </li>
            ))}
        </ul>
      ),
    },
  ]

  // Hide empty sections on the public site; number the ones that remain
  const sections = defs.filter((d) => d.hasContent || isDev)

  return (
    <article className="container-page py-12 sm:py-16">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
        <ArrowLeft size={15} aria-hidden="true" /> All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">{category.label}</span>
          <StatusBadge status={p.status} />
          {isDev && p.isExample && <span className="placeholder-chip">Example entry: edit in src/data/projects.ts</span>}
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{p.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{p.shortDescription}</p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[13rem_1fr]">
        <SectionNav items={sections.map((s) => ({ id: s.id, title: s.title }))} />
        <div className="min-w-0 space-y-12">
          {sections.map((s, i) => (
            <DetailSection
              key={s.id}
              id={s.id}
              number={i + 1}
              title={s.title}
              tag={s.tag}
              hasContent={s.hasContent}
              missingText={s.missingText}
            >
              {s.body}
            </DetailSection>
          ))}
        </div>
      </div>
    </article>
  )
}
