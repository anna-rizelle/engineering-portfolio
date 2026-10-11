import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Scroll back to the top whenever you move to a different page. */
function ScrollToTop() {
  const { pathname } = useLocation()
  // Braces matter here: the effect must return nothing. Some browsers return a
  // value from scrollTo, and React would try to run it as a cleanup function.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** The frame around every page: skip link, navigation, content, footer. */
export function Layout() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        onClick={(e) => {
          // Hash routing uses the URL hash for pages, so move focus manually.
          e.preventDefault()
          const main = document.getElementById('main')
          main?.focus()
          main?.scrollIntoView()
        }}
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
