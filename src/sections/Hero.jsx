import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../content/siteContent.js'
import Reveal from '../components/Reveal.jsx'
import TextReveal from '../components/TextReveal.jsx'
import Magnetic from '../components/Magnetic.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { headline, subhead, cta, scrollHint } = content.hero

  // scroll hint fades away as soon as the journey starts
  useLayoutEffect(() => {
    const tween = gsap.to('.scroll-hint', {
      autoAlpha: 0,
      scrollTrigger: { start: 30, end: 140, scrub: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="hero" className="section" style={{ position: 'relative' }}>
      <div className="section-inner">
        <div className="col-left">
          <TextReveal as="h1" className="hero-headline" delay={0.1}>
            {headline}
          </TextReveal>
          <Reveal delay={0.45}>
            <p className="hero-subhead">{subhead}</p>
          </Reveal>
          <Reveal delay={0.6}>
            <Magnetic>
              <a className="btn" href={cta.href}>
                {cta.label}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
      <span className="scroll-hint">{scrollHint}</span>
    </section>
  )
}
