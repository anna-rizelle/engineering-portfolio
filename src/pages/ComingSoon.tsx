import { Link } from 'react-router-dom'
import { usePageTitle } from '../utils/usePageTitle'

/** Temporary page for sections that are built in a later stage. */
export default function ComingSoon({ title }: { title: string }) {
  usePageTitle(title)
  return (
    <section className="container-page py-24">
      <p className="label-mono">Under construction</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-xl text-muted">
        This page is built in a later stage of the project. The navigation and routing already work.
      </p>
      <Link to="/" className="btn btn-secondary mt-6">
        Back to home
      </Link>
    </section>
  )
}
