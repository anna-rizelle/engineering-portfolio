import { useEffect, useState } from 'react'
import { FileText, Github, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { Editable } from './Editable'
import { ExternalLink } from './ExternalLink'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-sm px-3 py-2 text-sm transition-colors ${
    isActive ? 'text-accent' : 'text-muted hover:text-ink'
  }`

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [location.pathname])

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" className="font-mono text-sm font-medium tracking-wide">
          <Editable value={site.name} fallback="Engineering Portfolio" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          <ExternalLink
            href={site.github}
            ariaLabel="GitHub profile"
            placeholderLabel="[GitHub link]"
            className="rounded-sm p-2 text-muted transition-colors hover:text-ink"
          >
            <Github size={18} aria-hidden="true" />
          </ExternalLink>
          <Link to="/resume" className="btn btn-primary ml-2 !px-4 !py-2">
            <FileText size={15} aria-hidden="true" />
            Resume
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-sm p-2 text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <Link to="/resume" className="btn btn-primary flex-1">
                <FileText size={15} aria-hidden="true" />
                Resume
              </Link>
              <ExternalLink
                href={site.github}
                ariaLabel="GitHub profile"
                placeholderLabel="[GitHub link]"
                className="btn btn-secondary"
              >
                <Github size={16} aria-hidden="true" />
                GitHub
              </ExternalLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
