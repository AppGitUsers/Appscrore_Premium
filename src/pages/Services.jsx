import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Services.css'

const categories = ['All', 'Training', 'Consulting', 'Staffing', 'Development']

const services = [
  {
    id: 1,
    category: 'Training',
    icon: '🗄️',
    title: 'Database Management & Admin',
    desc: 'Deep-dive training in MS-SQL, Oracle, MySQL, PostgreSQL, and NoSQL databases.',
    features: ['Installation & Migration', 'Performance Tuning', 'Backup & Recovery', 'Security & Compliance'],
    accent: '#6c63ff',
    badge: 'Most Popular',
  },
  {
    id: 2,
    category: 'Training',
    icon: '☁️',
    title: 'Cloud Computing & DevOps',
    desc: 'Hands-on training in AWS, Azure, GCP, Docker, and Kubernetes.',
    features: ['Cloud Architecture', 'CI/CD Pipelines', 'Container Orchestration', 'Serverless'],
    accent: '#00f5ff',
  },
  {
    id: 3,
    category: 'Training',
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Coding with Gen AI, ChatGPT, Python ML, and real-world model deployment.',
    features: ['Python for ML', 'GenAI & Prompt Eng.', 'Model Deployment', 'Data Analytics'],
    accent: '#ff6584',
    badge: 'Trending',
  },
  {
    id: 4,
    category: 'Training',
    icon: '⚛️',
    title: 'Full-Stack Development',
    desc: 'Java, Python, JavaScript, React, Angular, Node.js — from zero to production.',
    features: ['Frontend: React/Angular', 'Backend: Node/Java/Python', 'REST APIs', 'Testing & Deployment'],
    accent: '#43e97b',
  },
  {
    id: 5,
    category: 'Consulting',
    icon: '🗃️',
    title: 'Database Support & Consulting',
    desc: 'Expert DBA services to keep your database healthy, fast, and secure.',
    features: ['DB Installation & Migration', 'High Availability Setup', 'Performance Troubleshooting', 'Compliance Management'],
    accent: '#6c63ff',
  },
  {
    id: 6,
    category: 'Consulting',
    icon: '💡',
    title: 'IT Consulting',
    desc: 'Strategic technology advice to transform your business with the right tools.',
    features: ['Tech Stack Advisory', 'Digital Transformation', 'Architecture Review', 'Cost Optimization'],
    accent: '#ff6584',
  },
  {
    id: 7,
    category: 'Staffing',
    icon: '👥',
    title: 'IT Staffing & Recruitment',
    desc: 'Hire pre-vetted IT talent — permanent, contract, or remote.',
    features: ['Technical Screening', 'Interview Support', 'Remote & On-Site Talent', 'Permanent & Contract'],
    accent: '#43e97b',
  },
  {
    id: 8,
    category: 'Development',
    icon: '🛠️',
    title: 'Custom Software Development',
    desc: 'End-to-end software products tailored to your business needs.',
    features: ['MVP Development', 'Enterprise Apps', 'API Development', 'Maintenance & Support'],
    accent: '#00f5ff',
  },
]

export default function Services() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? services : services.filter(s => s.category === active)

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="page-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="section-tag"><span className="dot"/> Our Offerings</div>
          <h1 className="heading-xl">
            Services that actually <span className="gradient-text">move things forward</span>
          </h1>
          <p className="page-hero-sub">
            From training freshers to overhauling enterprise databases — we do it all with the same level of obsessive quality.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs">
            {categories.map(c => (
              <button
                key={c}
                className={`filter-tab ${active === c ? 'active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-full-grid">
            {filtered.map(({ id, icon, title, desc, features, accent, badge }) => (
              <div key={id} className="service-full-card card" style={{ '--accent': accent }}>
                {badge && <span className="service-badge">{badge}</span>}
                <div className="sf-header">
                  <div className="sf-icon">{icon}</div>
                  <h3 className="sf-title">{title}</h3>
                </div>
                <p className="sf-desc">{desc}</p>
                <ul className="sf-features">
                  {features.map(f => (
                    <li key={f}>
                      <span className="feature-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="sf-footer">
                  <Link to="/contact" className="sf-cta">
                    Enquire Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
                <div className="sf-glow" style={{ background: accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section">
        <div className="container">
          <div className="about-cta card" style={{ textAlign: 'center', padding: '60px' }}>
            <h2 className="heading-lg">Not sure which service fits?</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Book a free 30-min call and we'll figure it out together.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Schedule Free Call</Link>
              <a href="tel:+918939600098" className="btn-outline">📞 +91 89396 00098</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
