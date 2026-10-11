import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface State {
  hasError: boolean
}

/**
 * Safety net: if any page crashes, visitors see a short message with a reload
 * button instead of a blank screen. The real error is still printed in the
 * browser console (F12) so it can be diagnosed.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page error:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-ink">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Something went wrong</p>
        <h1 className="mt-2 text-2xl font-semibold">This page could not be displayed</h1>
        <p className="mt-3 text-muted">Reloading the site usually fixes it.</p>
        <button
          type="button"
          className="btn btn-primary mt-6"
          onClick={() => {
            window.location.hash = '#/'
            window.location.reload()
          }}
        >
          Reload the site
        </button>
      </section>
    )
  }
}
