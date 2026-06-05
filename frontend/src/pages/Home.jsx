import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
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
    desc: 'Strategic technology advice that transforms how your business operates and scales globally.',
    accent: 'rgba(30,91,206,0.55)',
    tag: 'Strategy',
  },
  {
    icon: '🗄️',
    title: 'Database Support',
    desc: 'Expert DBA services for Oracle, SQL Server, MySQL, PostgreSQL — tuning to full migration.',
    accent: 'rgba(45,124,246,0.5)',
    tag: 'DBA',
  },
  {
    icon: '🎓',
    title: 'Corporate Training',
    desc: 'Industry-led programs in Data Engineering, AI/ML, Cloud, and Full-Stack. Real-world, not theory.',
    accent: 'rgba(14,165,233,0.5)',
    tag: 'Upskilling',
  },
  {
    icon: '🚀',
    title: 'Staffing & Recruitment',
    desc: 'Hire vetted IT professionals fast. Permanent, contract, or remote — screened and ready.',
    accent: 'rgba(59,130,246,0.5)',
    tag: 'Talent',
  },
  {
    icon: '💻',
    title: 'Software Development',
    desc: 'Full-stack web and mobile applications built for scale, speed, and long-term maintainability.',
    accent: 'rgba(30,91,206,0.55)',
    tag: 'Engineering',
  },
  {
    icon: '🌱',
    title: 'Internship Program',
    desc: 'Hands-on training in data pipelines, cloud platforms, and enterprise tools. Mentored by industry veterans.',
    accent: 'rgba(14,165,233,0.5)',
    tag: 'Training',
  },
]

const process = [
  {
    num: '01',
    icon: '🔍',
    title: 'Discovery',
    desc: 'We deep-dive into your goals, challenges, and existing tech stack. We listen before we act.',
  },
  {
    num: '02',
    icon: '🎯',
    title: 'Strategy',
    desc: 'A precise, tailored roadmap built around your specific context — not a template.',
  },
  {
    num: '03',
    icon: '⚙️',
    title: 'Execution',
    desc: 'Senior engineers and consultants deliver with discipline, transparency, and speed.',
  },
  {
    num: '04',
    icon: '🚀',
    title: 'Growth',
    desc: 'We don\'t disappear after delivery. Ongoing support, training, and iteration built in.',
  },
]

const techStack = [
  'Python', 'AWS', 'Oracle', 'React', 'Node.js', 'Azure',
  'Snowflake', 'Docker', 'PostgreSQL', 'Kafka', 'Apache Spark', 'Google Cloud',
  'Terraform', 'Kubernetes', 'Power BI', 'Databricks',
]

const whyCards = [
  { emoji: '🎯', title: 'Industry Experts',    desc: 'Trainers and consultants from Fortune 500 companies — not classroom instructors.' },
  { emoji: '🔧', title: 'Hands-On Learning',   desc: 'Live projects, real data, real stakes. Internships aren\'t simulation — they\'re work.' },
  { emoji: '🎨', title: 'Customised for You',  desc: 'No off-the-shelf packages. Every engagement is tailored to your specific context.' },
  { emoji: '🛡️', title: 'End-to-End Support', desc: 'From learning to placement and beyond — we stay with you long after delivery.' },
]

/* ── Scroll Reveal Hook ────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function Home() {
  const heroRef  = useRef(null)
  const glowRef  = useRef(null)
  useReveal()

  const handleMouse = useCallback(e => {
    let rafId
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      if (!heroRef.current || !glowRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      glowRef.current.style.left = `${((e.clientX - rect.left) / rect.width) * 100}%`
      glowRef.current.style.top  = `${((e.clientY - rect.top)  / rect.height) * 100}%`
    })
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (hero) hero.addEventListener('mousemove', handleMouse, { passive: true })
    return () => { if (hero) hero.removeEventListener('mousemove', handleMouse) }
  }, [handleMouse])

  return (
    <main className="home">

      {/* ── HERO ─────────────────────────── */}
      <section className="hero" ref={heroRef}>
        <div className="grid-bg" />
        <div className="hero-cursor-glow" ref={glowRef} />
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
            22 years of real-world IT expertise. We train, consult, staff, and build —
            so your business never falls behind the curve.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn-primary hero-cta">
              Start Your Journey
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/services" className="btn-outline">Explore Services</Link>
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

      {/* ── TICKER ───────────────────────── */}
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

      {/* ── ABOUT TEASER ─────────────────── */}
      <section className="section about-teaser">
        <div className="container">
          <div className="about-teaser-grid">
            <div className="about-teaser-content reveal">
              <div className="section-tag"><span className="dot" /> Our Story</div>
              <h2 className="heading-lg">
                We've been doing this <span className="gradient-text">before it was cool</span>
              </h2>
              <p>
                Founded by veterans who've worked at Verizon, Mastek, Telstra Australia, and Satyam Computers —
                Appscore Solutions bridges the gap between cutting-edge technology and real business outcomes.
              </p>
              <p>
                Whether you're a startup finding your footing or an enterprise scaling globally, we bring
                depth of experience with the freshness of modern thinking.
              </p>
              <Link to="/about" className="btn-outline" style={{ marginTop: '28px' }}>
                Our Full Story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="about-teaser-visual reveal" style={{ '--delay': '0.15s' }}>
              <div className="experience-card">
                <div className="exp-number">22</div>
                <div className="exp-text">Years of<br />Excellence</div>
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

      {/* ── SERVICES ─────────────────────── */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag"><span className="dot" /> What We Do</div>
            <h2 className="heading-lg">Services built for the <span className="gradient-text">real world</span></h2>
            <p className="section-subtitle">No fluff. No buzzwords. Practical IT solutions that move the needle.</p>
          </div>
          <div className="services-grid">
            {services.map(({ icon, title, desc, accent, tag }, i) => (
              <Link
                to="/services"
                key={title}
                className="service-card card reveal"
                style={{ '--delay': `${i * 0.07}s` }}
              >
                <div className="service-card-top">
                  <div className="service-icon">{icon}</div>
                  <span className="service-tag-pill">{tag}</span>
                </div>
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

      {/* ── HOW WE WORK ──────────────────── */}
      <section className="section process-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag"><span className="dot" /> Our Process</div>
            <h2 className="heading-lg">How we <span className="gradient-text">deliver excellence</span></h2>
            <p className="section-subtitle">A structured approach that consistently produces outstanding results.</p>
          </div>
          <div className="process-steps">
            {process.map(({ num, icon, title, desc }, i) => (
              <div
                key={title}
                className="process-step reveal"
                style={{ '--delay': `${i * 0.1}s` }}
              >
                <div className="step-number-circle">{num}</div>
                <div className="step-icon">{icon}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNSHIP BANNER ────────────── */}
      <section className="internship-banner">
        <div className="container">
          <div className="banner-inner">
            <div className="banner-content reveal">
              <div className="section-tag"><span className="dot" /> Internship Program</div>
              <h2 className="heading-lg">
                Launch your data career <span className="gradient-text">the right way</span>
              </h2>
              <p>
                Hands-on training in data pipelines, ETL workflows, cloud platforms (AWS, Azure, GCP),
                Apache Spark, and Kafka. Mentored by engineers who've built these systems for Fortune 500 companies.
              </p>
              <Link to="/contact" className="btn-primary" style={{ marginTop: '28px' }}>
                Apply for Internship
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="banner-modules reveal" style={{ '--delay': '0.15s' }}>
              {['Python & SQL', 'AWS / Azure / GCP', 'Snowflake & dbt', 'Apache Spark', 'Kafka Streaming', 'Data Modeling'].map(m => (
                <div key={m} className="module-chip">
                  <span>✓</span>{m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────── */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag"><span className="dot" /> Why Appscore</div>
            <h2 className="heading-lg">The reasons speak <span className="gradient-text">for themselves</span></h2>
          </div>
          <div className="why-grid">
            {whyCards.map(({ emoji, title, desc }, i) => (
              <div
                key={title}
                className="why-card card reveal"
                style={{ '--delay': `${i * 0.08}s` }}
              >
                <div className="why-emoji-wrap">{emoji}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────── */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag"><span className="dot" /> Ready-to-Deploy</div>
            <h2 className="heading-lg">
              Software we've built, <span className="gradient-text">ready for you</span>
            </h2>
            <p className="section-subtitle">
              Battle-tested platforms across fitness, automotive, education, database, and IT management.
              Live. Proven. Deployable in under a week.
            </p>
          </div>

          <div className="featured-grid">
            {products.slice(0, 3).map((p, i) => (
              <Link
                to={`/products/${p.id}`}
                key={p.id}
                className="featured-card card reveal"
                style={{ '--delay': `${i * 0.1}s` }}
              >
                <div className="fc-header">
                  <div
                    className="fc-icon"
                    style={{ background: p.dimColor, border: `1px solid ${p.borderColor}` }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="fc-cat"
                    style={{ color: p.color, background: p.dimColor, border: `1px solid ${p.borderColor}` }}
                  >
                    {p.category}
                  </span>
                </div>
                <h3 className="fc-title">{p.title}</h3>
                <p className="fc-tagline">{p.tagline}</p>
                <div className="fc-metrics">
                  {p.metrics.slice(0, 2).map(m => (
                    <div key={m.label} className="fc-metric">
                      <span style={{ color: p.color }}>{m.value}</span>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="fc-arrow" style={{ color: p.color }}>
                  View Case Study →
                </div>
                <div className="fc-bar" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              </Link>
            ))}
          </div>

          <div className="featured-footer reveal" style={{ '--delay': '0.3s' }}>
            <p>And {products.length - 3} more ready-to-deploy products →</p>
            <Link to="/products" className="btn-primary">
              Browse All Products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────── */}
      <section className="cta-strip">
        <div className="container">
          <div className="cta-inner reveal">
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
