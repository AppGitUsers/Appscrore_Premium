import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Services.css'

const categories = ['All', 'Development', 'Design']

const services = [
  {
    id: 1,
    category: 'Development',
    icon: '⬡',
    title: 'Web Applications',
    desc: 'Complex, scalable platforms — CRMs, ERPs, dashboards, portals. We architect systems that handle millions of users without breaking a sweat.',
    features: [
      'Custom Architecture',
      'Real-time Data',
      'Role-based Access',
      'API Integrations'
    ],
    accent: '#6c63ff'
  },
  {
    id: 2,
    category: 'Development',
    icon: '◈',
    title: 'Mobile Applications',
    desc: 'Native-feel cross-platform apps for iOS and Android. From patient management to fleet tracking — mobile experiences people actually use daily.',
    features: [
      'iOS & Android',
      'Offline-first',
      'Push Notifications',
      'Biometric Auth'
    ],
    accent: '#00f5ff'
  },
  {
    id: 3,
    category: 'Development',
    icon: '◉',
    title: 'Business Websites',
    desc: 'Your website is your best salesperson. We design high-converting sites that generate leads, build trust, and make competitors look amateur.',
    features: [
      'Conversion-optimized',
      'CMS Integration',
      'SEO-ready',
      'Analytics'
    ],
    accent: '#ff6584'
  },
  {
    id: 4,
    category: 'Development',
    icon: '◆',
    title: 'CRM & ERP Systems',
    desc: 'Replace spreadsheet chaos with intelligent business tools. Custom-built to your exact workflow — not the other way around.',
    features: [
      'Workflow Automation',
      'Custom Reports',
      'Multi-user Roles',
      'SMS & Email Triggers'
    ],
    accent: '#43e97b'
  },
  {
    id: 5,
    category: 'Development',
    icon: '◇',
    title: 'E-Commerce Platforms',
    desc: 'High-performance storefronts built to scale. From D2C brands to B2B catalogues — commerce engines that turn traffic into revenue.',
    features: [
      'Custom Storefront',
      'Inventory Sync',
      'Payment Gateway',
      'Cart Recovery'
    ],
    accent: '#f9cb28'
  },
  {
    id: 6,
    category: 'Design',
    icon: '◎',
    title: 'UI/UX Design',
    desc: 'Design that makes users lean forward. Every pixel serves a purpose. Complex workflows become intuitive experiences that feel effortless.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Design Systems'
    ],
    accent: '#ff4d6d'
  }
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
            {filtered.map(({ id, icon, title, desc, features, accent }) => (
              <div key={id} className="service-full-card card" style={{ '--accent': accent }}>
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
