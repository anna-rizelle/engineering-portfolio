import { Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { Editable } from './Editable'
import { ExternalLink } from './ExternalLink'
import { isPlaceholder } from '../utils/placeholders'

const iconLink = 'inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent'

export function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-mono text-sm">
            <Editable value={site.name} fallback="Engineering Portfolio" />
          </p>
          <p className="mt-2 text-sm text-muted">
            {site.degree}, {site.school}. Class of {site.graduationYear}.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link to="/projects" className="hover:text-ink">Projects</Link>
          <Link to="/skills" className="hover:text-ink">Skills</Link>
          <Link to="/about" className="hover:text-ink">About</Link>
          <Link to="/resume" className="hover:text-ink">Resume</Link>
          <Link to="/contact" className="hover:text-ink">Contact</Link>
        </nav>

        <div className="flex flex-col gap-2">
          <ExternalLink href={site.github} placeholderLabel="[GitHub link]" className={iconLink}>
            <Github size={16} aria-hidden="true" /> GitHub
          </ExternalLink>
          <ExternalLink href={site.linkedin} placeholderLabel="[LinkedIn link]" className={iconLink}>
            <Linkedin size={16} aria-hidden="true" /> LinkedIn
          </ExternalLink>
          <ExternalLink
            href={isPlaceholder(site.email) ? null : `mailto:${site.email}`}
            placeholderLabel="[Email address]"
            className={iconLink}
          >
            <Mail size={16} aria-hidden="true" /> Email
          </ExternalLink>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center font-mono text-xs text-muted">
        &copy; {new Date().getFullYear()} <Editable value={site.name} fallback="Engineering Portfolio" />
      </div>
    </footer>
  )
}
