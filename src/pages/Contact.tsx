import { CheckCircle2, Github, Linkedin, Mail, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { ExternalLink } from '../components/ExternalLink'
import { pageSettings } from '../data/pageSettings'
import { site } from '../data/site'
import { isDev, isPlaceholder } from '../utils/placeholders'
import { usePageTitle } from '../utils/usePageTitle'

type Values = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v: Values): Errors {
  const errors: Errors = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!emailPattern.test(v.email.trim())) errors.email = 'Please enter a valid email address, like name@example.com.'
  if (v.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.'
  return errors
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-sm border bg-surface px-3 py-2.5 text-sm placeholder:text-muted focus:border-accent ${
    hasError ? 'border-red-400' : 'border-line'
  }`

const iconLink = 'inline-flex items-center gap-3 text-ink transition-colors hover:text-accent'

export default function Contact() {
  usePageTitle('Contact')

  const [values, setValues] = useState<Values>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [honeypot, setHoneypot] = useState('') // bots fill this hidden field; people never see it
  const [status, setStatus] = useState<Status>('idle')

  // How the form delivers: through a form service, through the visitor's email app, or not at all
  const endpoint = isPlaceholder(pageSettings.formEndpoint) ? null : pageSettings.formEndpoint
  const emailReady = !isPlaceholder(site.email)
  const mode: 'service' | 'mailto' | 'none' = endpoint ? 'service' : emailReady ? 'mailto' : 'none'

  const update = (field: keyof Values, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // Once a field has shown an error, re-check it as the person types
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(next)[field] }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstBad = (['name', 'email', 'message'] as const).find((f) => found[f])
    if (firstBad) {
      document.getElementById(`contact-${firstBad}`)?.focus()
      return
    }

    if (mode === 'service' && endpoint) {
      if (honeypot) {
        setStatus('sent') // looks like a bot: pretend it worked, send nothing
        return
      }
      setStatus('sending')
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(`Form service replied ${res.status}`)
        setStatus('sent')
        setValues({ name: '', email: '', message: '' })
      } catch {
        setStatus('error')
      }
    } else if (mode === 'mailto') {
      // No server involved: open the visitor's email app with the message filled in
      const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`)
      const body = encodeURIComponent(`${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`)
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      setStatus('mailto')
    }
  }

  return (
    <section className="container-page py-16">
      <p className="label-mono">Contact</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Get in touch</h1>
      <p className="mt-3 max-w-2xl text-muted">
        I&rsquo;m interested in engineering internships, technical collaboration, and project
        discussions. The quickest way to reach me is by email or LinkedIn.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-[18rem_1fr]">
        {/* Direct links */}
        <div className="space-y-4">
          <ExternalLink
            href={emailReady ? `mailto:${site.email}` : null}
            placeholderLabel="[Email address]"
            className={iconLink}
          >
            <Mail size={18} className="text-accent" aria-hidden="true" /> {site.email}
          </ExternalLink>
          <div>
            <ExternalLink href={site.github} placeholderLabel="[GitHub link]" className={iconLink}>
              <Github size={18} className="text-accent" aria-hidden="true" /> GitHub
            </ExternalLink>
          </div>
          <div>
            <ExternalLink href={site.linkedin} placeholderLabel="[LinkedIn link]" className={iconLink}>
              <Linkedin size={18} className="text-accent" aria-hidden="true" /> LinkedIn
            </ExternalLink>
          </div>
        </div>

        {/* Form */}
        <div>
          {mode === 'none' ? (
            isDev && (
              <p className="max-w-md border-l-2 border-safety bg-safety/10 px-4 py-3 text-sm">
                Development note: the contact form is hidden until you add your email in{' '}
                <code className="font-mono">src/data/site.ts</code>.
              </p>
            )
          ) : (
            <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-5">
              <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>

              <Field id="contact-name" label="Name" error={errors.name}>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={inputClass(!!errors.name)}
                />
              </Field>
              <Field id="contact-email" label="Your email" error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={inputClass(!!errors.email)}
                />
              </Field>
              <Field id="contact-message" label="Message" error={errors.message}>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={inputClass(!!errors.message)}
                />
              </Field>

              {/* Hidden spam trap: leave empty */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
                  {status === 'sending' ? 'Sending...' : mode === 'mailto' ? 'Open in my email app' : 'Send message'}
                </button>
                {mode === 'mailto' && (
                  <p className="text-sm text-muted">This opens your email app. Nothing is sent until you press send there.</p>
                )}
              </div>

              {/* Result messages */}
              <div aria-live="polite">
                {status === 'sent' && (
                  <p className="flex items-start gap-2 border-l-2 border-emerald-400 bg-emerald-400/10 px-4 py-3 text-sm">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
                    Thanks, your message was sent.
                  </p>
                )}
                {status === 'mailto' && (
                  <p className="flex items-start gap-2 border-l-2 border-accent bg-accent/10 px-4 py-3 text-sm">
                    <Mail size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    Your email app should have opened with the message filled in. If it did not, write to {site.email}{' '}
                    directly.
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="flex items-start gap-2 border-l-2 border-red-400 bg-red-400/10 px-4 py-3 text-sm">
                    <TriangleAlert size={18} className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
                    The message could not be sent. Please try again, or email me directly
                    {emailReady ? ` at ${site.email}` : ''}.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
