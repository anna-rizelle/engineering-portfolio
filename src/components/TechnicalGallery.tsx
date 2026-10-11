import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ProjectImage } from '../data/types'
import { asset } from '../utils/assets'
import { isDev } from '../utils/placeholders'

/** Image viewer that opens over the page. Keyboard: Esc closes, arrow keys move. */
function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: ProjectImage[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const image = images[index]

  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // stop the page scrolling behind the viewer
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const go = (delta: number) => onIndex((index + delta + images.length) % images.length)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'Tab') {
        // Keep keyboard focus inside the viewer while it is open
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!buttons || buttons.length === 0) return
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, images.length, onClose, onIndex])

  const navButton =
    'absolute top-1/2 -translate-y-1/2 rounded-sm border border-line bg-surface/90 p-2 text-ink hover:border-accent'

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="relative max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={asset(image.src)}
          alt={image.alt}
          className="mx-auto max-h-[72vh] w-auto max-w-full object-contain"
        />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-muted">{image.caption}</p>
        <p className="mt-1 text-center font-mono text-xs text-muted">
          {index + 1} / {images.length}
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute -top-2 right-0 rounded-sm border border-line bg-surface/90 p-2 text-ink hover:border-accent sm:-top-3"
        >
          <X size={18} aria-hidden="true" />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${navButton} left-0`}
              aria-label="Previous image"
              onClick={() => onIndex((index - 1 + images.length) % images.length)}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${navButton} right-0`}
              aria-label="Next image"
              onClick={() => onIndex((index + 1) % images.length)}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/** Grid of figures with captions. Click or press Enter on a figure to enlarge it. */
export function TechnicalGallery({ images }: { images: ProjectImage[] }) {
  // Stand-in images appear in development only
  const visible = images.filter((img) => isDev || !img.placeholder)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [failed, setFailed] = useState<Record<string, boolean>>({})
  const lastOpened = useRef(0)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Give keyboard focus back to the figure that opened the viewer
  useEffect(() => {
    if (openIndex === null) buttonRefs.current[lastOpened.current]?.focus()
  }, [openIndex])

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {visible.map((img, i) => {
          const missing = failed[img.src]
          // Never show a broken image on the public site
          if (missing && !isDev) return null
          return (
            <figure key={img.src + i} className="border border-line bg-surface">
              {missing ? (
                <div className="flex aspect-[16/10] items-center justify-center p-4 text-center">
                  <span className="placeholder-chip">[Image file not found: public/{img.src}]</span>
                </div>
              ) : (
                <button
                  type="button"
                  ref={(el) => {
                    buttonRefs.current[i] = el
                  }}
                  onClick={() => {
                    lastOpened.current = i
                    setOpenIndex(i)
                  }}
                  aria-label={`Enlarge image: ${img.alt}`}
                  className="group relative block w-full"
                >
                  <img
                    src={asset(img.src)}
                    alt={img.alt}
                    loading="lazy"
                    onError={() => setFailed((f) => ({ ...f, [img.src]: true }))}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 rounded-sm bg-bg/80 p-1.5 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ZoomIn size={16} aria-hidden="true" />
                  </span>
                </button>
              )}
              <figcaption className="border-t border-line p-3 text-sm leading-relaxed text-muted">
                {img.placeholder && isDev && <span className="placeholder-chip mr-2">Placeholder</span>}
                {img.caption}
              </figcaption>
            </figure>
          )
        })}
      </div>

      {openIndex !== null && visible[openIndex] && (
        <Lightbox
          images={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndex={setOpenIndex}
        />
      )}
    </>
  )
}
