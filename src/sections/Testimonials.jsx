import content from '../content/siteContent.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Testimonials() {
  const { eyebrow, heading, quotes } = content.testimonials
  return (
    <section id="testimonials" className="section section-testimonials">
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} heading={heading} />
        <ul className="quote-row">
          {quotes.map((q, i) => (
            <Reveal key={q.author} as="li" className="quote-card" delay={0.12 * i}>
              <blockquote>“{q.quote}”</blockquote>
              <p className="quote-author">{q.author}</p>
              <p className="quote-detail">{q.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
