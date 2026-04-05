import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(24px, 5vw, 56px)',
          background: scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.35s, border-color 0.35s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '18px', color: '#fff', letterSpacing: '-0.5px',
          }}
        >
          ZR<span style={{ color: 'var(--accent)' }}>.</span>
        </button>

        {/* Desktop links */}
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.45)',
                fontSize: '12px', fontFamily: 'var(--font-body)',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                fontWeight: 400, transition: 'color 0.2s', padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/CV_Zakariya_Raddaoui.pdf"
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              border: '1px solid rgba(201,255,71,0.35)',
              borderRadius: '4px', padding: '7px 16px',
              fontSize: '12px', color: 'var(--accent)',
              fontFamily: 'var(--font-body)', letterSpacing: '1px',
              textTransform: 'uppercase', transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,255,71,0.08)'
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(201,255,71,0.35)'
            }}
          >
            CV ↓
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px', flexDirection: 'column', gap: '5px',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.5px', background: '#fff',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: menuOpen && i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : menuOpen && i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 199,
              background: 'rgba(10,10,10,0.97)',
              borderBottom: '1px solid var(--border)',
              padding: '20px clamp(24px, 5vw, 56px) 28px',
              display: 'flex', flexDirection: 'column', gap: '18px',
            }}
          >
            {NAV.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.7)', fontSize: '22px',
                  fontFamily: 'var(--font-display)', fontWeight: 700, textAlign: 'left', padding: 0,
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          nav { display: none !important; }
        }
      `}</style>
    </>
  )
}
