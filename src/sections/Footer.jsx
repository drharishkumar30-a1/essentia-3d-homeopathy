import content from '../content/siteContent.js'

export default function Footer() {
  const { legal, links } = content.footer
  return (
    <footer className="footer">
      <p>{legal}</p>
      <ul className="footer-links">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
