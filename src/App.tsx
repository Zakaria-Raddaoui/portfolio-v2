import Navbar from './components/Navbar'
import SideNav from './components/SideNav'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <SideNav />
      <div className="main-content" style={{ paddingTop: '64px' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
