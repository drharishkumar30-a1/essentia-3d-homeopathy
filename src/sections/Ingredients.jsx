import content from '../content/siteContent.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Ingredients() {
  const { eyebrow, heading, intro, botanicals } = content.ingredients
  return (
    <section id="ingredients" className="section section-ingredients">
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} heading={heading} />
        <Reveal delay={0.1}>
          <p style={{ maxWidth: '34rem' }}>{intro}</p>
        </Reveal>
        <ul className="botanical-grid">
          {botanicals.map((b, i) => (
            <Reveal key={b.name} as="li" className="botanical-card" delay={0.08 * i}>
              <h3>{b.name}</h3>
              <p className="botanical-latin">{b.latin}</p>
              <p className="botanical-note">{b.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
