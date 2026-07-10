import { useState } from 'react'
import content from '../content/siteContent.js'
import Reveal from '../components/Reveal.jsx'
import TextReveal from '../components/TextReveal.jsx'
import Magnetic from '../components/Magnetic.jsx'

export default function Contact() {
  const { eyebrow, heading, subhead, ctaLabel, email, formEndpoint, disclaimer, successMessage, errorMessage } =
    content.contact
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!formEndpoint) {
      // no endpoint configured yet — fall back to the visitor's mail client
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Enquiry — ' + content.brand.name)}`
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section section-contact">
      <div className="section-inner">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <TextReveal as="h2" className="section-heading">
          {heading}
        </TextReveal>
        <Reveal delay={0.1}>
          <p className="contact-subhead">{subhead}</p>
        </Reveal>
        {/* mobile-only: opens a clear stage for the vial so it doesn't
            sit under the form/disclaimer text (desktop has room already) */}
        <div className="contact-vial-stage" aria-hidden="true" />
        <Reveal delay={0.2}>
          {status === 'success' ? (
            <p className="contact-status is-success" role="status">
              {successMessage}
            </p>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                aria-label="Your email address"
              />
              <Magnetic strength={0.25}>
                <button type="submit" className="btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : ctaLabel}
                </button>
              </Magnetic>
            </form>
          )}
          {status === 'error' && (
            <p className="contact-status is-error" role="alert">
              {errorMessage}
            </p>
          )}
        </Reveal>
        <Reveal delay={0.3}>
          <p className="contact-disclaimer">{disclaimer}</p>
        </Reveal>
      </div>
    </section>
  )
}
