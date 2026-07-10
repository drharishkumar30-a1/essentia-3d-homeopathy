import content from '../content/siteContent.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Philosophy() {
  const { eyebrow, heading, paragraphs, principles } = content.philosophy
  return (
    <section id="philosophy" className="section">
      <div className="section-inner">
        <div className="col-right">
          <SectionHeading eyebrow={eyebrow} heading={heading} />
          {paragraphs.map((text, i) => (
            <Reveal key={i} delay={0.1 * (i + 1)}>
              <p style={{ marginBottom: 'var(--space-3)' }}>{text}</p>
            </Reveal>
          ))}
          <ul className="principles">
            {principles.map((p, i) => (
              <Reveal key={p.title} as="li" className="principle" delay={0.12 * i}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
