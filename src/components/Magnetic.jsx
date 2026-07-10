import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

// Wraps a single child; the child is gently pulled toward the cursor
// while hovered and springs back on leave.
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    const move = (e) => {
      const rect = el.getBoundingClientRect()
      xTo((e.clientX - rect.left - rect.width / 2) * strength)
      yTo((e.clientY - rect.top - rect.height / 2) * strength)
    }
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [reduced, strength])

  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}
