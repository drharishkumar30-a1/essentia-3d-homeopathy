import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Masked line-by-line reveal for headlines. Waits for webfonts so line
// breaks are split against the real font metrics.
export default function TextReveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !ref.current) return
    let split
    let cancelled = false

    gsap.set(ref.current, { autoAlpha: 0 })
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return
      split = SplitText.create(ref.current, { type: 'lines', mask: 'lines' })
      gsap.set(ref.current, { autoAlpha: 1 })
      gsap.from(split.lines, {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.09,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          once: true,
        },
      })
    })

    return () => {
      cancelled = true
      split?.revert()
    }
  }, [reduced, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
