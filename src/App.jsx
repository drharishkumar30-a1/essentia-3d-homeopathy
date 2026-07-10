import SmoothScroll from './components/SmoothScroll.jsx'
import Navbar from './components/Navbar.jsx'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import SceneCanvas from './scene/SceneCanvas.jsx'
import { useSceneScrollTimeline } from './scene/useSceneScrollTimeline.js'
import Hero from './sections/Hero.jsx'
import Philosophy from './sections/Philosophy.jsx'
import Products from './sections/Products.jsx'
import Ingredients from './sections/Ingredients.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  useSceneScrollTimeline()

  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Navbar />
      <SceneCanvas />
      <div className="dim-overlay" aria-hidden="true" />
      <div className="film-overlay" aria-hidden="true" />
      <main>
        <Hero />
        <Philosophy />
        <Products />
        <Ingredients />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
