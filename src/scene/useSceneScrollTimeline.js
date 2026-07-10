import { useLayoutEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneState } from './sceneState.js'
import content from '../content/siteContent.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { useDeviceProfile } from '../hooks/useDeviceProfile.js'

gsap.registerPlugin(ScrollTrigger)

const TURN = Math.PI * 2
const PHILOSOPHY_ROT = Math.PI * 1.1 // ~200° reveal rotation

// Builds one scrubbed ScrollTrigger timeline per section. Each timeline
// tweens the plain-number sceneState object; BottleRig applies it in
// useFrame. Ranges are back-to-back ('top bottom' → 'top top'), so the
// choreography chains cleanly in both scroll directions.
//
// On mobile the horizontal travel is compressed and the camera pulled
// back so the vial always stays inside the narrow viewport.
export function useSceneScrollTimeline() {
  const reduced = usePrefersReducedMotion()
  const { isMobile } = useDeviceProfile()

  useLayoutEffect(() => {
    // x-compression, overall scale, camera pull-back for narrow viewports
    const fx = isMobile ? 0.3 : 1
    const fs = isMobile ? 0.85 : 1
    const cz = (z) => (isMobile ? z + 0.9 : z)
    // smaller than fs: the hero vial has to fit in the gap between the
    // CTA button and the "scroll to begin" hint on a short mobile screen
    const heroScale = isMobile ? 0.65 : 1

    // starting (hero) pose — also what reduced-motion users see.
    // On mobile the vial sits low, clear of the CTA button above it.
    gsap.set(sceneState.group, { x: 1.2 * fx, y: isMobile ? -1.27 : 0, scale: heroScale })
    gsap.set(sceneState.camera, { z: cz(6) })

    if (reduced) return // static hero pose, no scroll choreography

    const section = (trigger) => ({
      scrollTrigger: { trigger, start: 'top bottom', end: 'top top', scrub: true },
      defaults: { ease: 'none', immediateRender: false },
    })

    const ctx = gsap.context(() => {
      // ── Philosophy: vial crosses to the left with a big reveal spin ──
      gsap
        .timeline(section('#philosophy'))
        .to(sceneState.group, { x: -1.4 * fx, y: 0, scale: fs, rotY: 0.4 + PHILOSOPHY_ROT }, 0)
        .to(sceneState.camera, { z: cz(5) }, 0)

      // ── Products: back to the right, then a third-turn + tint per remedy ──
      content.products.forEach((product, i) => {
        const color = new THREE.Color(product.liquidColor ?? product.accentColor)
        const tl = gsap.timeline(section(`#product-${product.id}`))
        tl.to(
          sceneState.group,
          { rotY: 0.4 + PHILOSOPHY_ROT + (i + 1) * (TURN / 3) },
          0,
        )
        tl.to(sceneState.liquid.color, { r: color.r, g: color.g, b: color.b }, 0)
        // subtle breathe as each remedy takes the stage
        tl.to(sceneState.group, { scale: 1.06 * fs, duration: 0.5 }, 0)
        tl.to(sceneState.group, { scale: 1 * fs, duration: 0.5 }, 0.5)
        if (i === 0) {
          tl.to(sceneState.group, { x: 1.3 * fx }, 0)
          tl.to(sceneState.camera, { z: cz(6) }, 0)
          tl.to(sceneState.pellets, { spread: 0 }, 0)
        }
      })

      // ── Ingredients: cork pops off, THEN the globules escape ──
      gsap
        .timeline(section('#ingredients'))
        .to(sceneState.group, { scale: 0.55 * fs, x: 0, y: 0.4, duration: 1 }, 0)
        .to(sceneState.camera, { z: cz(6.5), duration: 1 }, 0)
        .to(sceneState.cork, { open: 1, duration: 0.3 }, 0)
        .to(sceneState.pellets, { spread: 1, duration: 0.7 }, 0.28)

      // ── Testimonials: the room dims (DOM overlay, cheaper than tonemapping) ──
      gsap
        .timeline(section('#testimonials'))
        .to('.dim-overlay', { opacity: 0.6 }, 0)

      // ── Contact: globules return home first, then the cork reseals.
      // On mobile a spacer (see Contact.jsx) opens a clear stage below
      // the form so the vial doesn't sit under the input/disclaimer. ──
      const neutral = new THREE.Color('#f5f0e4')
      gsap
        .timeline(section('#contact'))
        .to(
          sceneState.group,
          {
            scale: isMobile ? 0.5 * fs : 0.75,
            x: 0,
            y: isMobile ? -0.7 : -0.6,
            rotY: TURN * 2,
            duration: 1,
          },
          0,
        )
        .to(sceneState.camera, { z: cz(5.8), duration: 1 }, 0)
        .to(sceneState.pellets, { spread: 0, duration: 0.55 }, 0)
        .to(sceneState.cork, { open: 0, duration: 0.35 }, 0.6)
        .to(sceneState.liquid.color, { r: neutral.r, g: neutral.g, b: neutral.b, duration: 1 }, 0)
        .to('.dim-overlay', { opacity: 0, duration: 1 }, 0)
    })

    return () => ctx.revert()
  }, [reduced, isMobile])
}
