import { Download, Printer } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Editable } from '../components/Editable'
import { ExternalLink } from '../components/ExternalLink'
import { StatusBadge } from '../components/StatusBadge'
import { TextList } from '../components/TextList'
import { projects } from '../data/projects'
import { resume } from '../data/resume'
import type { ResumeEntry } from '../data/resume'
import { site } from '../data/site'
import { skillCategories } from '../data/skills'
import { asset } from '../utils/assets'
import { isDev, isPlaceholder, realItems } from '../utils/placeholders'
import { useFileExists } from '../utils/useFileExists'
import { usePageTitle } from '../utils/usePageTitle'

/** One resume section. Hidden on the public site when it has no content. */
function ResumeSection({
  title,
  hasContent,
  missing,
  children,
}: {
  title: string
  hasContent: boolean
  missing: string
  children: ReactNode
}) {
  if (!hasContent && !isDev) return null
  return (
    <section className="break-inside-avoid border-t border-line pt-6">
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent">{title}</h2>
      <div className="mt-4">{hasContent ? children : <span className="placeholder-chip">{missing}</span>}</div>
    </section>
  )
}

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-medium">
          {entry.title}
          {entry.organization && <span className="font-normal text-muted">, {entry.organization}</span>}
        </p>
        {entry.dates && <p className="font-mono text-xs text-muted">{entry.dates}</p>}
      </div>
      {entry.bullets && (
        <div className="mt-2">
          <TextList items={entry.bullets} />
        </div>
      )}
    </div>
  )
}

/** Shows a profile link as readable text, which also helps when the page is printed. */
function ContactLine({ label, href, display, placeholder }: { label: string; href?: string | null; display?: string; placeholder: string }) {
  return (
    <p className="text-sm">
      <span className="text-muted">{label}: </span>
      <ExternalLink href={href} placeholderLabel={placeholder} className="text-accent hover:underline">
        {display}
      </ExternalLink>
    </p>
  )
}

export default function Resume() {
  usePageTitle('Resume')
  const fileState = useFileExists(site.resumePath)

  // Technical skills: only skills you have confirmed in skills.ts
  const skillGroups = skillCategories
    .map((c) => ({ title: c.title, names: c.skills.filter((s) => s.confirmed).map((s) => s.name) }))
    .filter((g) => g.names.length > 0)

  // Projects: only ones that are in progress or completed (never planned ones)
  const resumeProjects = projects.filter((p) => p.status !== 'planned')

  const emailReady = !isPlaceholder(site.email)
  const edu = resume.education

  return (
    <section className="container-page max-w-4xl py-16">
      {/* Buttons: not printed */}
      <div className="no-print">
        <p className="label-mono">Resume</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Resume</h1>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {fileState === 'yes' && (
            <a href={asset(site.resumePath)} download className="btn btn-primary">
              <Download size={16} aria-hidden="true" /> Download Resume PDF
            </a>
          )}
          <button type="button" onClick={() => window.print()} className="btn btn-secondary">
            <Printer size={16} aria-hidden="true" /> Print this page
          </button>
        </div>

        {isDev && fileState === 'no' && (
          <div className="mt-6 max-w-2xl border-l-2 border-safety bg-safety/10 px-4 py-3 text-sm">
            <p className="font-medium text-safety">Development reminder: resume PDF not found</p>
            <p className="mt-1 text-muted">
              The download button is hidden until the file exists. Save your resume as{' '}
              <code className="font-mono">resume.pdf</code> inside the project&rsquo;s{' '}
              <code className="font-mono">public</code> folder (so the path is{' '}
              <code className="font-mono">public/resume.pdf</code>), then refresh this page.
            </p>
          </div>
        )}
      </div>

      {/* The resume itself: also what gets printed */}
      <article className="print-light mt-10 space-y-8 border border-line bg-surface p-6 sm:p-10">
        <header>
          <p className="text-2xl font-semibold tracking-tight">
            <Editable value={site.name} fallback="Resume" />
          </p>
          <p className="mt-1 text-sm text-muted">
            {site.degree}, {site.school}
          </p>
        </header>

        <ResumeSection
          title="Professional summary"
          hasContent={!isPlaceholder(resume.summary)}
          missing="[Add a short professional summary in src/data/resume.ts]"
        >
          <p className="leading-relaxed">{resume.summary}</p>
        </ResumeSection>

        <ResumeSection title="Education" hasContent missing="">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-medium">
              {edu.school}
              <span className="font-normal text-muted">, {edu.degree}</span>
            </p>
            <p className="font-mono text-xs text-muted">{edu.dates}</p>
          </div>
          {edu.details.length > 0 && (isDev || realItems(edu.details).length > 0) && (
            <div className="mt-2">
              <TextList items={edu.details} />
            </div>
          )}
        </ResumeSection>

        <ResumeSection
          title="Technical skills"
          hasContent={skillGroups.length > 0}
          missing="[Confirm skills in src/data/skills.ts to list them here]"
        >
          <dl className="space-y-2 text-sm">
            {skillGroups.map((g) => (
              <div key={g.title} className="sm:grid sm:grid-cols-[14rem_1fr] sm:gap-4">
                <dt className="text-muted">{g.title}</dt>
                <dd>{g.names.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection
          title="Engineering projects"
          hasContent={resumeProjects.length > 0}
          missing="[Projects appear here once their status is 'in-progress' or 'completed']"
        >
          <ul className="space-y-4">
            {resumeProjects.map((p) => (
              <li key={p.id} className="break-inside-avoid">
                <div className="flex flex-wrap items-center gap-3">
                  <Link to={`/projects/${p.slug}`} className="font-medium text-accent hover:underline">
                    {p.title}
                  </Link>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-1 text-sm text-muted">{p.shortDescription}</p>
                {p.tools.length > 0 && <p className="mt-1 font-mono text-xs text-muted">{p.tools.join(' / ')}</p>}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection
          title="Relevant experience"
          hasContent={resume.experience.length > 0}
          missing="[Add experience in src/data/resume.ts, or leave empty if none]"
        >
          <div className="space-y-5">
            {resume.experience.map((e) => (
              <Entry key={e.title + (e.organization ?? '')} entry={e} />
            ))}
          </div>
        </ResumeSection>

        <ResumeSection
          title="Engineering teams and extracurriculars"
          hasContent={resume.teams.length > 0}
          missing="[Add teams and involvement in src/data/resume.ts, or leave empty if none]"
        >
          <div className="space-y-5">
            {resume.teams.map((e) => (
              <Entry key={e.title + (e.organization ?? '')} entry={e} />
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Contact" hasContent missing="">
          <div className="space-y-1">
            <ContactLine
              label="Email"
              href={emailReady ? `mailto:${site.email}` : null}
              display={site.email}
              placeholder="[Email address]"
            />
            <ContactLine
              label="GitHub"
              href={site.github}
              display={site.github.replace(/^https?:\/\//, '')}
              placeholder="[GitHub link]"
            />
            <ContactLine
              label="LinkedIn"
              href={site.linkedin}
              display={site.linkedin.replace(/^https?:\/\//, '')}
              placeholder="[LinkedIn link]"
            />
          </div>
        </ResumeSection>
      </article>
    </section>
  )
}
