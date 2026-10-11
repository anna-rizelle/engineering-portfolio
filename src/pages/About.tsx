import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { aboutSections } from '../data/about'
import { pageSettings } from '../data/pageSettings'
import { site } from '../data/site'
import { asset } from '../utils/assets'
import { isDev, isPlaceholder } from '../utils/placeholders'
import { usePageTitle } from '../utils/usePageTitle'

export default function About() {
  usePageTitle('About')
  const [photoFailed, setPhotoFailed] = useState(false)
  const hasPhoto = !isPlaceholder(pageSettings.aboutPhoto) && !photoFailed
  const showPhotoSlot = hasPhoto || isDev

  return (
    <section className="container-page py-16">
      <p className="label-mono">About</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">About me</h1>

      {isDev && (
        <p className="mt-6 max-w-2xl border-l-2 border-safety bg-safety/10 px-4 py-3 text-sm">
          Development note: this is draft text based on your brief. Edit{' '}
          <code className="font-mono">src/data/about.ts</code> so it sounds like you.
        </p>
      )}

      <div className={`mt-10 grid gap-12 ${showPhotoSlot ? 'md:grid-cols-[1fr_16rem]' : ''}`}>
        <div className="max-w-2xl space-y-10">
          {aboutSections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
              <div className="mt-3 space-y-4 leading-relaxed text-ink/90">
                {section.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/projects" className="btn btn-primary">
              See my projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>

        {showPhotoSlot && (
          <figure className="md:sticky md:top-24 md:self-start">
            {hasPhoto ? (
              <img
                src={asset(pageSettings.aboutPhoto)}
                alt={isPlaceholder(pageSettings.aboutPhotoAlt) ? `Photo of ${site.name}` : pageSettings.aboutPhotoAlt}
                onError={() => setPhotoFailed(true)}
                loading="lazy"
                className="aspect-[4/5] w-full border border-line object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center border border-dashed border-safety/60 bg-surface p-4 text-center">
                <span className="placeholder-chip">
                  [Optional photo: set aboutPhoto in src/data/pageSettings.ts]
                </span>
              </div>
            )}
          </figure>
        )}
      </div>
    </section>
  )
}
