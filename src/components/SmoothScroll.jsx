import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

// Smooths native scrolling with Lenis and keeps ScrollTrigger in sync.
// Skipped entirely when the user prefers reduced motion.
export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    window.lenis = lenis // programmatic scrolling (anchors, debugging)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete window.lenis
    }
  }, [reduced])

  return children
}
