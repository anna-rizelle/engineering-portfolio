import { ArrowRight, Bot, Github, Rocket, Ruler, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ExternalLink } from '../components/ExternalLink'
import { HeroGraphic } from '../components/HeroGraphic'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { usePageTitle } from '../utils/usePageTitle'

const focusAreas = [
  { icon: Wind, label: 'Aerodynamics & CFD' },
  { icon: Ruler, label: 'Mechanical Design' },
  { icon: Rocket, label: 'Propulsion & Structures' },
  { icon: Bot, label: 'Autonomous Systems' },
]

const technicalInterests = [
  {
    title: 'Flow behavior around aerodynamic surfaces',
    text: 'How geometry, angle of attack, and Reynolds number shape pressure distribution, lift, and drag.',
  },
  {
    title: 'Engineering design optimization',
    text: 'Using analysis and iteration to trade off performance, mass, and manufacturability.',
  },
  {
    title: 'Structural performance and material selection',
    text: 'Load paths, factors of safety, and where composites make sense.',
  },
  {
    title: 'Propulsion and thermodynamic analysis',
    text: 'Estimating performance from first principles before trusting a simulation.',
  },
  {
    title: 'Autonomous robotic systems',
    text: 'How sensing, control, and software architecture come together in a vehicle that flies or moves itself.',
  },
]

export default function Home() {
  usePageTitle()
  const featured = projects.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="label-mono fade-up">
            {site.school} / Mechanical Engineering / Class of {site.graduationYear}
          </p>
          <h1
            className="fade-up mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
            style={{ animationDelay: '80ms' }}
          >
            Engineering the intersection of aerodynamics, simulation, and mechanical design.
          </h1>
          <p
            className="fade-up mt-5 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: '160ms' }}
          >
            I&rsquo;m a University of Florida mechanical engineering student exploring aerospace systems
            through computational analysis, CAD, hands-on experimentation, and independent engineering
            projects.
          </p>
          <div
            className="fade-up mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <Link to="/projects" className="btn btn-primary">
              Explore My Projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/resume" className="btn btn-secondary">
              View Resume
            </Link>
            <ExternalLink
              href={site.github}
              placeholderLabel="[GitHub link]"
              className="inline-flex items-center gap-2 px-2 py-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <Github size={16} aria-hidden="true" /> GitHub
            </ExternalLink>
          </div>
        </div>

        <div className="fade-up" style={{ animationDelay: '200ms' }}>
          <HeroGraphic />
        </div>
      </section>

      {/* ---------- Engineering focus strip ---------- */}
      <section aria-label="Engineering focus areas" className="border-y border-line bg-surface/60">
        <ul className="container-page grid grid-cols-2 gap-px py-0 md:grid-cols-4">
          {focusAreas.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 py-5 text-sm">
              <Icon size={18} className="shrink-0 text-accent" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Featured projects ---------- */}
      <section className="container-page pt-20">
        <SectionHeading label="01 / Projects" title="Featured projects">
          Technical breakdowns covering theory, methodology, and validation. Each project shows its
          current status.
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <div className="mt-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
            See all projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ---------- Technical interests ---------- */}
      <section className="container-page pt-24">
        <SectionHeading label="02 / Interests" title="Problems I want to explore">
          Areas of interest that guide the projects I choose.
        </SectionHeading>
        <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
          {technicalInterests.map((item, i) => (
            <li
              key={item.title}
              className="bg-surface p-6 md:[&:last-child:nth-child(odd)]:col-span-2"
            >
              <span className="font-mono text-xs text-safety">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-medium">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- About preview ---------- */}
      <section className="container-page pt-24">
        <div className="grid gap-8 border border-line bg-surface p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <p className="label-mono">03 / About</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Theory first, then build and check</h2>
            <p className="mt-3 leading-relaxed text-muted">
              I&rsquo;m a mechanical engineering student at the {site.school}, graduating in{' '}
              {site.graduationYear}. I like understanding the physics behind a design, then using CAD,
              computation, and simulation to test it. I build practical skills through projects
              alongside my coursework.
            </p>
          </div>
          <Link to="/about" className="btn btn-secondary">
            Read more about me
          </Link>
        </div>
      </section>

      {/* ---------- Contact call to action ---------- */}
      <section className="container-page pt-24">
        <div className="border-t border-line pt-12 text-center">
          <p className="label-mono">04 / Contact</p>
          <h2 className="mx-auto mt-2 max-w-xl text-2xl font-semibold tracking-tight">
            Let&rsquo;s talk about engineering
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            I&rsquo;m interested in engineering internships, technical collaboration, and project
            discussions.
          </p>
          <Link to="/contact" className="btn btn-primary mt-6">
            Get in touch <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
