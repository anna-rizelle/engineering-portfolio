import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import Skills from './pages/Skills'

// The project detail page is loaded only when someone opens a project. This keeps
// the first page load fast, because it pulls in the equation-rendering library (KaTeX).
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

// HashRouter keeps page addresses after a "#" (like /#/projects). That lets the
// site work on GitHub Pages and any static host with no extra server settings.
export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<p className="container-page py-24 text-muted">Loading...</p>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="skills" element={<Skills />} />
            <Route path="about" element={<About />} />
            <Route path="resume" element={<Resume />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
