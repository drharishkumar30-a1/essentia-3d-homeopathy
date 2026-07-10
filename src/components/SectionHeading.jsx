import Reveal from './Reveal.jsx'
import TextReveal from './TextReveal.jsx'

export default function SectionHeading({ eyebrow, heading }) {
  return (
    <>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <TextReveal as="h2" className="section-heading">
        {heading}
      </TextReveal>
    </>
  )
}
