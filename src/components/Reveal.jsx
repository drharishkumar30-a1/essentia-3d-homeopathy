import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

// Fades/slides its children in when they enter the viewport.
// With prefers-reduced-motion, renders visible and skips the tween.
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced, delay])

  return (
    <Tag ref={ref} className={`reveal ${reduced ? 'is-static' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
