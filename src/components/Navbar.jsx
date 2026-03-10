import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'Company' },
  { path: '/services', label: 'Services' },
  { path: '/careers', label: 'Careers' },
  { path: '/clients', label: 'Clients' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 34 34" fill="none">
              <rect width="34" height="34" rx="9" fill="url(#lg)"/>
              <path d="M9 24L15 11L21 19.5L25.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="25.5" cy="15" r="2.5" fill="rgba(255,255,255,0.9)"/>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="34" y2="34">
                  <stop offset="0%" stopColor="#8b85ff"/>
                  <stop offset="100%" stopColor="#c9a84c"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Appscore</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={`nav-link ${location.pathname === path ? 'active' : ''}`}>
                {label}
                <span className="nav-link-underline" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link to="/contact" className="btn-primary nav-cta">
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={`mobile-link ${location.pathname === path ? 'active' : ''}`}>
                {label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="btn-primary mobile-cta">
              Free Consultation →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
