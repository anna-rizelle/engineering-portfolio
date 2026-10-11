import { Link } from 'react-router-dom'
import { usePageTitle } from '../utils/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="container-page py-24">
      <p className="label-mono">Error 404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-muted">
        That address doesn&rsquo;t match any page on this site. It may have moved, or the link may be
        mistyped.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/projects" className="btn btn-secondary">Browse projects</Link>
      </div>
    </section>
  )
}
