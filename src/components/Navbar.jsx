import { useState, useEffect } from 'react'
import content from '../content/siteContent.js'

export default function Navbar() {
  const { name, nav } = content.brand
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // freeze smooth-scroll while the mobile menu is open
  useEffect(() => {
    if (open) window.lenis?.stop()
    else window.lenis?.start()
    return () => window.lenis?.start()
  }, [open])

  return (
    <>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#hero" className="navbar-brand" onClick={() => setOpen(false)}>
          {name}
        </a>
        <nav aria-label="Primary">
          <ul className="navbar-links">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
