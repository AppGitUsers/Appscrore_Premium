import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const stats = [
  { value: '22+', label: 'Years Experience' },
  { value: '120+', label: 'Happy Clients' },
  { value: '32+', label: 'Projects Delivered' },
  { value: '73', label: 'Expert Team' },
]

const services = [
  {
    icon: '⚡',
    title: 'IT Consulting',
    desc: 'Strategic technology advice that transforms how your business operates and scales.',
    accent: 'rgba(123,116,255,0.55)',
  },
  {
    icon: '🗄️',
    title: 'Database Support',
    desc: 'Expert DBA services for Oracle, SQL Server, MySQL, PostgreSQL — from tuning to full migration.',
    accent: 'rgba(201,168,76,0.5)',
  },
  {
    icon: '🎓',
    title: 'Corporate Training',
    desc: 'Industry-led programs in Data Engineering, AI/ML, Cloud, and Full-Stack. Real-world, not theory.',
    accent: 'rgba(78,205,196,0.5)',
  },
  {
    icon: '🚀',
    title: 'Staffing & Recruitment',
    desc: 'Hire vetted IT professionals fast. Permanent, contract, or remote — screened and ready.',
    accent: 'rgba(224,123,123,0.5)',
  },
]

const techStack = ['Python', 'AWS', 'Oracle', 'React', 'Node.js', 'Azure', 'Snowflake', 'Docker', 'PostgreSQL', 'Kafka', 'Apache Spark', 'Google Cloud']

export default function Home() {
  const heroRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 })

  useEffect(() => {
    let rafId
    const handleMouse = (e) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!heroRef.current) return
        const rect = heroRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      })
    }
    const hero = heroRef.current
    if (hero) hero.addEventListener('mousemove', handleMouse, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      if (hero) hero.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="grid-bg" />
        <div
          className="hero-cursor-glow"
          style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%` }}
        />
        <div className="hero-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        <div className="container hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            Now accepting new clients — 2024
          </div>

          <h1 className="hero-title">
            Where Technology<br />
            <span className="gradient-text">Meets Mastery</span>
          </h1>

          <div className="hero-rule">
            <div className="hero-rule-line" />
            <span className="hero-rule-text">Est. 2002 · Chennai, India</span>
          </div>

          <p className="hero-subtitle">
            22 years of real-world IT expertise. We train, consult, staff, and build — so your business never falls behind the curve.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn-primary hero-cta">
              Start Your Journey
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/services" className="btn-outline">
              Explore Services
            </Link>
          </div>

          <div className="hero-stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="hero-stat">
                <span className="stat-value gradient-text">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot">◆</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT TEASER */}
      <section className="section about-teaser">
        <div className="container">
          <div className="about-teaser-grid">
            <div className="about-teaser-content">
              <div className="section-tag"><span className="dot"/> Our Story</div>
              <h2 className="heading-lg">
                We've been doing this <span className="gradient-text">before it was cool</span>
              </h2>
              <p>
                Founded by veterans who've worked at Verizon, Mastek, Telstra Australia, and Satyam Computers — Appscore Solutions bridges the gap between cutting-edge technology and real business outcomes.
              </p>
              <p>
                Whether you're a startup finding your footing or an enterprise scaling globally, we bring depth of experience with the freshness of modern thinking.
              </p>
              <Link to="/about" className="btn-outline" style={{ marginTop: '28px' }}>
                Our Full Story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="about-teaser-visual">
              <div className="experience-card">
                <div className="exp-number gradient-text">22</div>
                <div className="exp-text">Years of<br/>Excellence</div>
                <div className="exp-ring" />
                <div className="exp-ring-2" />
              </div>
              <div className="floating-badges">
                <div className="f-badge f-badge-1">🏆 Industry Leaders</div>
                <div className="f-badge f-badge-2">🌏 Global Clients</div>
                <div className="f-badge f-badge-3">⭐ 4.9 / 5 Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> What We Do</div>
            <h2 className="heading-lg">Services built for the <span className="gradient-text">real world</span></h2>
            <p className="section-subtitle">No fluff. No buzzwords. Practical IT solutions that move the needle.</p>
          </div>
          <div className="services-grid">
            {services.map(({ icon, title, desc, accent }) => (
              <Link to="/services" key={title} className="service-card card">
                <div className="service-icon">{icon}</div>
                <h3 className="service-title">{title}</h3>
                <p className="service-desc">{desc}</p>
                <div className="service-arrow">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                <div className="service-glow" style={{ background: accent }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNSHIP BANNER */}
      <section className="internship-banner">
        <div className="container">
          <div className="banner-inner">
            <div className="banner-content">
              <div className="section-tag"><span className="dot"/> Internship Program</div>
              <h2 className="heading-lg">Launch your data career <span className="gradient-text">the right way</span></h2>
              <p>
                Hands-on training in data pipelines, ETL workflows, cloud platforms (AWS, Azure, GCP), Apache Spark, and Kafka. Mentored by engineers who've built these systems for Fortune 500 companies.
              </p>
              <Link to="/contact" className="btn-primary" style={{ marginTop: '28px' }}>
                Apply for Internship
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="banner-modules">
              {['Python & SQL', 'AWS / Azure / GCP', 'Snowflake & dbt', 'Apache Spark', 'Kafka Streaming', 'Data Modeling'].map(m => (
                <div key={m} className="module-chip">
                  <span>✓</span>{m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag"><span className="dot"/> Why Appscore</div>
            <h2 className="heading-lg">The reasons speak <span className="gradient-text">for themselves</span></h2>
          </div>
          <div className="why-grid">
            {[
              { emoji: '🎯', title: 'Industry Experts', desc: 'Trainers and consultants from Fortune 500 companies — not classroom instructors.' },
              { emoji: '🔧', title: 'Hands-On Learning', desc: 'Live projects, real data, real stakes. Internships aren\'t simulation — they\'re work.' },
              { emoji: '🎨', title: 'Customised for You', desc: 'No off-the-shelf packages. Every engagement is tailored to your specific context.' },
              { emoji: '🛡️', title: 'End-to-End Support', desc: 'From learning to placement and beyond — we stay with you long after delivery.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="why-card card">
                <span className="why-emoji">{emoji}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2 className="heading-md">Ready to level up your tech game?</h2>
              <p>Book a free consultation. Zero commitment, maximum clarity.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
              <a href="tel:+918939600098" className="btn-outline">📞 Call Us</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
