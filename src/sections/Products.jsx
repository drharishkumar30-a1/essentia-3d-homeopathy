import { useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../content/siteContent.js'

gsap.registerPlugin(ScrollTrigger)

// Pinned showcase: the text layer stays fixed (CSS sticky) while 300svh
// of scroll passes; invisible full-height segments drive both the card
// crossfade here and the 3D vial timelines (they keep the #product-<id>
// triggers used by useSceneScrollTimeline).
export default function Products() {
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const triggers = content.products.map((product, i) =>
      ScrollTrigger.create({
        trigger: `#product-${product.id}`,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(i),
      }),
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section id="products" className="products-track">
      <div className="products-sticky">
        <div className="section-inner">
          <div className="products-cards">
            {content.products.map((product, i) => (
              <article
                className={`product-card ${i === active ? 'is-active' : ''}`}
                key={product.id}
                aria-hidden={i !== active}
              >
                <p className="product-index">
                  {String(i + 1).padStart(2, '0')} /{' '}
                  {String(content.products.length).padStart(2, '0')}
                </p>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-benefit" style={{ color: product.accentColor }}>
                  {product.benefit}
                </p>
                <p className="product-desc">{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {content.products.map((product, i) => (
        <div
          className="product-segment"
          id={`product-${product.id}`}
          key={product.id}
          style={{ top: `${i * 100}svh` }}
        />
      ))}
    </section>
  )
}
