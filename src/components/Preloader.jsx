import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import content from '../content/siteContent.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

// Brand-mark intro: name + tagline rise in, hold a beat, then the veil
// lifts to reveal the hero. Scroll is locked while it plays.
export default function Preloader() {
  const overlayRef = useRef(null)
  const [done, setDone] = useState(false)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) {
      setDone(true)
      return
    }

    window.lenis?.stop()
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            window.lenis?.start()
            setDone(true)
          },
        })
        .from('.preloader-name', { yPercent: 120, duration: 0.9, ease: 'power4.out', delay: 0.15 })
        .from('.preloader-tagline', { autoAlpha: 0, y: 14, duration: 0.6, ease: 'power2.out' }, '-=0.35')
        .to('.preloader-rule', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '<')
        .to(overlayRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.45 })
    }, overlayRef)

    return () => {
      ctx.revert()
      window.lenis?.start()
    }
  }, [reduced])

  if (done) return null

  return (
    <div className="preloader" ref={overlayRef} aria-hidden="true">
      <div className="preloader-mask">
        <p className="preloader-name">{content.brand.name}</p>
      </div>
      <span className="preloader-rule" />
      <p className="preloader-tagline">{content.brand.tagline}</p>
    </div>
  )
}
