import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { useDeviceProfile } from '../hooks/useDeviceProfile.js'

const INTERACTIVE = 'a, button, input, [data-cursor]'

// Amber dot + trailing sage ring on fine-pointer, non-mobile devices;
// the ring swells over interactive elements. Gated on the same
// isMobile profile as the rest of the site (pointer OR narrow width)
// plus touch-point detection, so hybrid devices never get a stray
// cursor mark stuck at the origin.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const { isMobile } = useDeviceProfile()
  const hasTouch = typeof window !== 'undefined' && navigator.maxTouchPoints > 0
  const fine = !isMobile && !hasTouch

  useEffect(() => {
    if (!fine || reduced) return
    document.documentElement.classList.add('has-custom-cursor')

    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.38, ease: 'power3.out' })
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.38, ease: 'power3.out' })

    const move = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }
    const over = (e) => {
      if (e.target.closest(INTERACTIVE)) ringRef.current.classList.add('is-hovering')
    }
    const out = (e) => {
      if (e.target.closest(INTERACTIVE)) ringRef.current.classList.remove('is-hovering')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [fine, reduced])

  if (!fine || reduced) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
